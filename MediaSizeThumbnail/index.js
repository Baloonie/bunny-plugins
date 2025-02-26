import { before } from "@vendetta/patcher";
import { findByProps, findByName } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";

const AttachmentPicker = findByProps("pickAttachments");
const ImageComponent = findByName("Image");

let unpatch;

export function onLoad() {
    unpatch = before("pickAttachments", AttachmentPicker, (args) => {
        args[0].onSelect = (attachments) => {
            attachments.forEach((file) => {
                const sizeInKB = (file.size / 1024).toFixed(2);
                
                // Create a small overlay inside the media thumbnail
                const overlay = React.createElement("div", {
                    style: {
                        position: "absolute",
                        bottom: 5,
                        right: 5,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "white",
                        fontSize: 10,
                        padding: "2px 4px",
                        borderRadius: 4,
                    }
                }, `${sizeInKB} KB`);

                file.overlayComponent = overlay;
            });
        };
    });
}

export function onUnload() {
    if (unpatch) unpatch();
}
