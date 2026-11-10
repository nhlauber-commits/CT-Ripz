// Runs check.sh on any OS. check.sh calls Apple's JavaScriptCore (`jsc`),
// which only exists on macOS. Elsewhere this runs an unmodified copy of
// check.sh with Node standing in for jsc. check.sh itself is never edited.
// Usage: npm run check   (needs `sh` on PATH; on Windows, Git Bash provides it)
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { delimiter, dirname, join } from 'node:path'

const JSC = '/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc'
// From PowerShell or cmd, sh is usually not on PATH; Git for Windows ships one.
const SH = ['sh', ...['ProgramFiles', 'ProgramW6432', 'LOCALAPPDATA']
  .map((v) => process.env[v] && join(process.env[v], v === 'LOCALAPPDATA' ? 'Programs/Git' : 'Git', 'usr/bin/sh.exe'))
  .filter((p) => p && existsSync(p))]
const run = (script, env) => {
  for (const sh of SH) {
    // Put sh's own folder first on PATH so mktemp, sed and grep are found too.
    const PATH = sh === 'sh' ? process.env.PATH : dirname(sh) + delimiter + process.env.PATH
    const r = spawnSync(sh, [script], { stdio: 'inherit', env: { ...process.env, ...env, PATH } })
    if (!r.error) return r
  }
  return { error: true, status: 1 }
}

if (existsSync(JSC)) process.exit(run('check.sh').status ?? 1)

// Temp files go inside the repo (git-ignored): under Git Bash, the system temp
// path is "/tmp", which Node and sh resolve to different folders.
// Forward slashes work for both Node and the MSYS/Git Bash `sh` on Windows.
mkdirSync('.check-tmp', { recursive: true })
const dir = mkdtempSync(join(process.cwd(), '.check-tmp', 'run-')).replace(/\\/g, '/')
const shim = `${dir}/jsc-shim.cjs`
writeFileSync(shim, `
const fs=require('fs'),vm=require('vm');
globalThis.print=(...a)=>console.log(...a);
// Git Bash hands over paths like /c/Users/...; turn them into C:/Users/...
const p=f=>process.platform==='win32'?f.replace(/^\\/([a-zA-Z])\\//,'$1:/'):f;
globalThis.readFile=f=>fs.readFileSync(p(f),'utf8');
globalThis.quit=c=>process.exit(c||0);
const a=process.argv.slice(2);
vm.runInThisContext(a[0]==='-e'?a[1]:readFile(a[0]));
`)
const node = process.execPath.replace(/\\/g, '/')
writeFileSync(`${dir}/jsc`, `#!/bin/sh\nexec "${node}" "${shim}" "$@"\n`)
const script = readFileSync('check.sh', 'utf8').replace(/^JSC=.*$/m, `JSC="${dir}/jsc"`)
writeFileSync(`${dir}/check.sh`, script)

const r = run(`${dir}/check.sh`, { TMPDIR: dir })
rmSync(dir, { recursive: true, force: true })
if (r.error) console.error('Could not start sh. Run this from Git Bash, or install Git for Windows.')
process.exit(r.status ?? 1)
