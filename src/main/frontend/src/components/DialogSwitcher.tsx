import React, {cloneElement} from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FilePlus2} from "lucide-react";


function DialogSwitcher({ children }: { children: React.ReactNode }) {
    const [content, setContent] = React.useState(true);

    const toggleContent = () => {
        setContent(prev => !prev);
    };

    const validChildren = React.Children.toArray(children).filter(React.isValidElement);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>Create Loan<FilePlus2/></Button>
            </DialogTrigger>
            <DialogContent>
                {content ? cloneElement(validChildren[0] as React.ReactElement, { toggle: toggleContent }) : cloneElement(validChildren[1] as React.ReactElement, { toggle: toggleContent })}
            </DialogContent>
        </Dialog>
    )
}

export default DialogSwitcher;