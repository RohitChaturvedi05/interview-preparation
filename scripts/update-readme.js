const fs = require('fs');
const path = require('path');

const contributingSection = `
## Contributing

Contributions are welcome! If you have any additional questions or improvements, please submit a pull request. 

Before submitting a pull request, please make sure that you have updated the README.md file with the latest changes.
To do this, run the following commands:
\`\`\`bash
npm run update:readme
\`\`\`
`;

const licenseSection = `
## License

This repository is licensed under the MIT License.
`;

const readmePath = path.join(__dirname, '../README.md');
const markdownFiles = fs
    .readdirSync(path.join(__dirname, '../'))
    .filter((file) => file.endsWith('.md') && file !== 'README.md');

const generateSectionLinks = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const links = [];

    lines.forEach((line) => {
        const match = line.match(/^##\s+(.*)/);
        if (match) {
            const section = match[1];
            const anchor = section
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            links.push(`- [${section}](#${anchor})`);
        }
    });

    return links.join('\n');
};

const updateReadme = () => {
    let readmeContent = fs.readFileSync(readmePath, 'utf-8');
    const tableOfContentsStart = readmeContent.indexOf('## Table of Contents');
    const tableOfContentsEnd = readmeContent.indexOf(
        '\n',
        tableOfContentsStart + 1
    );

    if (tableOfContentsStart === -1) {
        console.error('Table of Contents section not found in README.md');
        return;
    }

    let newTableOfContents = '## Table of Contents\n\n';
    let newSections = '';

    markdownFiles.forEach((file, index) => {
        const sectionName = path.basename(file, '.md');
        newTableOfContents += `${
            index + 1
        }. [${sectionName}](#${sectionName.toLowerCase()})\n`;
        newSections += `\n## ${sectionName}\n\n${generateSectionLinks(
            path.join(__dirname, '../', file)
        )}\n`;
    });

    readmeContent =
        readmeContent.slice(0, tableOfContentsStart) + newTableOfContents;

    // Add Contributing and License sections at the end

    readmeContent += newSections + contributingSection + licenseSection;

    fs.writeFileSync(readmePath, readmeContent, 'utf-8');
    console.log('README.md updated successfully');
};

updateReadme();
