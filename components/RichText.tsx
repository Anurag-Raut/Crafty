import React, { useState, useRef, SyntheticEvent, useEffect } from "react";
import { ReorderIcon } from "./icon/reorderIcon";
import { Item } from "./item";
const { Reorder, useDragControls } = require("framer-motion")
export default function RichText() {
    const [content, setContent] = useState<string>("");
    const [underlinedContents, setUnderlinedContents] = useState<{}[]>([]);
    const [text, setText] = useState<string>('')
    const divRef = useRef<HTMLDivElement>(null);
    // const dragControls = useDragControls()

    const handleUnderline = () => {
        const selection = window.getSelection();
        if (
            selection &&
            selection.rangeCount > 0 &&
            divRef.current?.contains(selection.anchorNode) &&
            divRef.current?.contains(selection.focusNode)
        ) {
            const range = selection.getRangeAt(0);
            const selectedText = range.toString();
            if (selectedText) {

                const isAlreadyUnderlined = rangeIsUnderlined(range);


                if (isAlreadyUnderlined) {
                    const parentElement = range.commonAncestorContainer.parentElement;
                    if (parentElement?.tagName === "U") {
                        parentElement.outerHTML = parentElement.innerHTML;
                    }
                } else {
                    const underlineElement = document.createElement("u");
                    underlineElement.appendChild(document.createTextNode(selectedText));
                    range.deleteContents();
                    range.insertNode(underlineElement);
                }

                const updatedContent = divRef.current?.innerHTML;
                setContent(updatedContent || "");
            }
        }
    };

    // console.log(text)
    useEffect(() => {
        const updatedContent = divRef.current?.innerHTML;
        setText(updatedContent || "");
    }, [content])

    useEffect(() => {
        // Get all contents inside the <u> tag from the content
        const uTagElements = divRef.current?.querySelectorAll("u");
        if (uTagElements) {
            const contents: any = [];
            uTagElements.forEach((element, index) => {
                const cleanedContent = element.innerHTML.replace(/&nbsp;/, " ").trim();
                contents.push({ item: cleanedContent, index });
            });
            setUnderlinedContents(contents);
            // console.log(contents);
        }
    }, [text]);
    console.log({text,content})


    // Helper function to check if the given range contains underlined text
    const rangeIsUnderlined = (range: Range) => {
        const parentElement = range.commonAncestorContainer.parentElement;
        return parentElement?.tagName === "U";
    };
    return (
        <div>
            <div
                ref={divRef}
                contentEditable={true}
                className="border border-gray-600 p-2 rounded-md"
                placeholder="Enter"

                onInput={(event) => {
                    const updatedContent = divRef.current?.innerHTML;
                    setText(updatedContent || "");
                }}
                dangerouslySetInnerHTML={{ __html: content }} 
            />
            <button onClick={handleUnderline}> underline</button>
            <p>  Reorder the Items in their corrext Sequence </p>
          
            <Reorder.Group axis="y" className=' w-[full] ' onReorder={setUnderlinedContents} values={underlinedContents}>
      {underlinedContents.map((data:any) => (
        <Item key={data.index} id={data.index} item={data} />
     
      ))}
    </Reorder.Group>
        </div>
    );
}
