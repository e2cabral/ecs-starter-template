
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const versionType = args[0] || 'patch';

if (!['major', 'minor', 'patch'].includes(versionType)) {
  console.error('Tipo de versão inválido. Use: major, minor ou patch');
  process.exit(1);
}

try {
  execSync(`npm version ${versionType} --no-git-tag-version`);

  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
  const newVersion = packageJson.version;

  const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
  const changelog = fs.existsSync(changelogPath)
    ? fs.readFileSync(changelogPath, 'utf8')
    : '# Changelog\n\n';

  const commitMessages = execSync('git log --pretty=format:"- %s" $(git describe --tags --abbrev=0)..HEAD')
    .toString()
    .trim();

  const today = new Date().toISOString().split('T')[0];
  const newEntry = `\n## [${newVersion}] - ${today}\n\n${commitMessages || '- Atualizações internas'}\n`;

  fs.writeFileSync(changelogPath, changelog.replace('# Changelog\n\n', `# Changelog\n\n${newEntry}`));

  console.log(`Versão atualizada para ${newVersion}`);
  console.log('CHANGELOG atualizado com sucesso');

} catch (error) {
  console.error('Erro ao atualizar versão:', error);
  process.exit(1);
}