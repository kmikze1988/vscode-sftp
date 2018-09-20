import { COMMAND_LIST_ALL } from '../constants';
import { showTextDocument } from '../host';
import { FileType } from '../core';
import { downloadFile, downloadFolder } from '../fileHandlers';
import { checkFileCommand } from './abstract/createCommand';
import { selectFileFromAll } from './shared';

export default checkFileCommand({
  id: COMMAND_LIST_ALL,
  getFileTarget: selectFileFromAll,

  async handleFile(ctx) {
    const remotefs = await ctx.fileService.getRemoteFileSystem();
    const fileEntry = await remotefs.lstat(ctx.target.localFsPath);
    if (fileEntry.type !== FileType.Directory) {
      await downloadFile(ctx, { ignore: null });
      await showTextDocument(ctx.target.localUri);
    } else {
      await downloadFolder(ctx, { ignore: null });
    }
  },
});
