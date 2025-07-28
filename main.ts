import { Plugin, TFile, WorkspaceLeaf } from 'obsidian';

export default class AutoDeleteUntitledEmptyNotesPlugin extends Plugin {
	private lastFile: TFile | null = null;

	onload() {
		this.registerEvent(
			this.app.workspace.on('active-leaf-change', async (newLeaf: WorkspaceLeaf | null) => {
				if (this.lastFile) {
					await this.tryDeleteIfUntitledAndEmpty(this.lastFile);
				}
				this.lastFile = this.extractFileFromLeaf(newLeaf);
			})
		);

		// Handles closing the app or reloading
		window.addEventListener('beforeunload', this.handleWindowClose);
		this.register(() => window.removeEventListener('beforeunload', this.handleWindowClose));
	}

	onunload() {
		// All cleanup handled by `register` and `registerEvent`
	}

	private handleWindowClose = async () => {
		if (this.lastFile) {
			await this.tryDeleteIfUntitledAndEmpty(this.lastFile);
		}
	};

	private extractFileFromLeaf(leaf: WorkspaceLeaf | null): TFile | null {
		if (!leaf) return null;
		const view: any = leaf.view;
		if (view && view.file instanceof TFile) {
			return view.file as TFile;
		}
		return null;
	}

	private async tryDeleteIfUntitledAndEmpty(file: TFile) {
		// Only delete markdown files
		if (file.extension !== 'md') return;

		// If file name contains 'Untitled'
		if (!/untitled/i.test(file.basename)) return;

		// Check for empty content
		const content = await this.app.vault.read(file);

		// Check if content is empty (exclude file header)
		if (content.trim().length > file.basename.length + 2) return;

		const filePath = file.path;

		// Close open tabs for this file
		this.app.workspace.iterateAllLeaves((leaf: WorkspaceLeaf) => {
			const leafView: any = leaf.view;
			if (leafView && leafView.file && leafView.file.path === filePath) {
				leaf.detach();
			}
		});

		await this.app.vault.delete(file);
	}
}
