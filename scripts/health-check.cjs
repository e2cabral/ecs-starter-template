const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const checkDependencies = () => {
  console.log('📦 Verificando dependências desatualizadas:');
  try {
    const outdated = execSync('npm outdated --json').toString();
    const outdatedPackages = Object.keys(JSON.parse(outdated));

    if (outdatedPackages.length > 0) {
      console.log(`  ⚠️  ${outdatedPackages.length} pacotes desatualizados:`);
      outdatedPackages.forEach(pkg => console.log(`     - ${pkg}`));
    } else {
      console.log('  ✅ Todas as dependências estão atualizadas');
    }
  } catch (error) {
    handleOutdatedError(error);
  }
};

const handleOutdatedError = (error) => {
  if (error.stdout) {
    const outdated = JSON.parse(error.stdout.toString());
    const outdatedPackages = Object.keys(outdated);
    console.log(`  ⚠️  ${outdatedPackages.length} pacotes desatualizados:`);
    outdatedPackages.forEach(pkg => console.log(`     - ${pkg}`));
  } else {
    console.log('  ❌ Erro ao verificar dependências');
  }
};

const checkVulnerabilities = () => {
  console.log('\n🔒 Verificando vulnerabilidades:');
  try {
    execSync('npm audit --json');
    console.log('  ✅ Nenhuma vulnerabilidade encontrada');
  } catch (error) {
    handleVulnerabilitiesError(error);
  }
};

const handleVulnerabilitiesError = (error) => {
  if (error.stdout) {
    const audit = JSON.parse(error.stdout.toString());
    const { vulnerabilities } = audit.metadata;
    console.log(`  ⚠️  ${vulnerabilities.total} vulnerabilidades encontradas`);

    if (vulnerabilities.critical > 0) {
      console.log(`     - Críticas: ${vulnerabilities.critical}`);
    }
    if (vulnerabilities.high > 0) {
      console.log(`     - Altas: ${vulnerabilities.high}`);
    }
  } else {
    console.log('  ❌ Erro ao verificar vulnerabilidades');
  }
};

const checkTestCoverage = () => {
  console.log('\n🧪 Verificando cobertura de testes:');
  try {
    execSync('npm test -- --coverage --silent');
    const coverageFile = path.join(process.cwd(), 'coverage', 'coverage-summary.json');

    if (fs.existsSync(coverageFile)) {
      analyzeCoverageReport(coverageFile);
    } else {
      console.log('  ⚠️  Relatório de cobertura não encontrado');
    }
  } catch {
    console.log('  ❌ Erro ao executar testes');
  }
};

const analyzeCoverageReport = (coverageFile) => {
  const coverage = JSON.parse(fs.readFileSync(coverageFile, 'utf8'));
  const totalCoverage = coverage.total.statements.pct;

  if (totalCoverage >= 80) {
    console.log(`  ✅ Cobertura de código: ${totalCoverage}%`);
  } else {
    console.log(`  ⚠️  Cobertura de código abaixo do ideal: ${totalCoverage}%`);
  }
};

const checkLint = () => {
  console.log('\n🧹 Verificando lint:');
  try {
    execSync('npm run lint');
    console.log('  ✅ Código está em conformidade com o estilo definido');
  } catch {
    console.log('  ❌ Problemas de lint encontrados');
  }
};

const main = () => {
  console.log('🔍 Verificando saúde do projeto...\n');
  checkDependencies();
  checkVulnerabilities();
  checkTestCoverage();
  checkLint();
  console.log('\n🏁 Verificação concluída!');
};

main();
