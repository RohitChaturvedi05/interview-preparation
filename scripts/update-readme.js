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
const collectionPath = path.join(__dirname, '../collection');

const sectionOrder = [
    'Javascript',
    'Typescript',
    'WebFundamental',
    'Graphql',
    'Mongodb',
];

const getMarkdownFiles = (dir) => {
    const files = fs.readdirSync(dir);
    let markdownFiles = [];

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            markdownFiles = markdownFiles.concat(getMarkdownFiles(filePath));
        } else if (file.endsWith('.md')) {
            markdownFiles.push(filePath);
        }
    });

    return markdownFiles;
};

const markdownFiles = getMarkdownFiles(collectionPath);

const generateSectionLinks = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const links = [];
    const fileName = path.basename(filePath);

    lines.forEach((line) => {
        const match = line.match(/^##\s+(.*)/);
        if (match) {
            const section = match[1];
            const anchor = section
                .toLowerCase()
                .replace(/[^a-z0-9&]+/g, '_') // Replace non-alphanumeric characters except '&' with underscores
                .replace(/&/g, '--') // Replace '&' with double hyphens
                .replace(/_+/g, '-') // Replace multiple underscores with a single hyphen
                .replace(/(^-|-$)/g, '') // Remove leading or trailing hyphens
                .replace(/----/g, '--'); // Replace '&' with double hyphens
            links.push(`- [${section}](${fileName}#${anchor})`);
        }
    });

    return links.join('\n');
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

    const sections = {};

    markdownFiles.forEach((file) => {
        const relativePath = path.relative(collectionPath, file);
        const parts = relativePath.split(path.sep);

        if (parts.length === 1) {
            const sectionName = capitalizeFirstLetter(
                path.basename(file, '.md')
            );
            sections[sectionName] = {
                type: 'file',
                filePath: file,
                sectionName,
            };
        } else {
            const folderName = capitalizeFirstLetter(parts[0]);
            const fileName = capitalizeFirstLetter(path.basename(file, '.md'));

            if (!sections[folderName]) {
                sections[folderName] = {
                    type: 'folder',
                    files: [],
                };
            }

            sections[folderName].files.push({
                fileName,
                filePath: file,
            });
        }
    });

    sectionOrder.forEach((sectionName) => {
        if (sections[sectionName]) {
            if (sections[sectionName].type === 'file') {
                newTableOfContents += `- [${sectionName}](#${sectionName.toLowerCase()})\n`;
                newSections += `\n## ${sectionName}\n\n${generateSectionLinks(
                    sections[sectionName].filePath
                )}\n`;
            } else if (sections[sectionName].type === 'folder') {
                newTableOfContents += `- [${sectionName}](#${sectionName.toLowerCase()})\n`;
                newSections += `\n## ${sectionName}\n`;
                sections[sectionName].files.forEach(
                    ({ fileName, filePath }) => {
                        newSections += `\n### ${fileName}\n\n${generateSectionLinks(
                            filePath
                        )}\n`;
                    }
                );
            }
        }
    });

    readmeContent =
        readmeContent.slice(0, tableOfContentsStart) + newTableOfContents;

    // Add Contributing and License sections at the end

    readmeContent += newSections + contributingSection + licenseSection;

    fs.writeFileSync(readmePath, readmeContent, 'utf-8');
    console.log('README.md updated successfully');
};

updateReadme();
