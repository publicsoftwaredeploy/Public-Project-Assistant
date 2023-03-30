import { invoke } from "@tauri-apps/api";
import { appWindow } from "@tauri-apps/api/window";

export type Node = {
    id: number,
    name: string,
    path: string,
    modified: string,
    depth: number,
    project: boolean,
}

appWindow.listen("spotlight_changed", (data) => {
    const SpotlightChangedEvent = new CustomEvent("spotlight_changed", {
        detail: data.payload,
        cancelable: false,
    });

    window.dispatchEvent(SpotlightChangedEvent);
});

export async function getVault(): Promise<Node> {
    return invoke("get_vault");
}

export async function getAll(): Promise<Node[]> {
    return invoke("get_all");
}

export async function readDirectory(path: string): Promise<string[]> {
    return invoke("read_directory", { path });
}

export async function isFile(path: string): Promise<boolean> {
    return invoke("is_file", { path });
}

export async function fileExists(path: string): Promise<boolean> {
    return invoke("file_exists", { path });
}

export async function readFile(path: string): Promise<string> {
    return invoke("read_file", { path });
}