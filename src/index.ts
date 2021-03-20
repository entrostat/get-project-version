import { Command, flags } from '@oclif/command';
import { promises as fs } from 'fs';

class GetProjectVersion extends Command {
    static description = `Output the version from the package.json to screen`;

    static flags = {
        'no-version-prefix': flags.boolean({
            char: 'n',
            description: 'Whether to leave out the "v" in front of the package.json version.',
        }),
    };

    static args = [{ name: 'file', default: './package.json', description: 'The path to the package.json file' }];

    async run() {
        const { args, flags } = this.parse(GetProjectVersion);
        const packageJsonContent = await fs.readFile(args.file).then((d) => JSON.parse(d.toString()));
        this.log(`${flags['no-version-prefix'] ? '' : 'v'}${packageJsonContent.version}`);
    }
}

export = GetProjectVersion;
