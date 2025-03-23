import { useEffect, useState } from "react";

interface TextFormat {
    firstName: string;
    lastName: string;
    surName: string;
}

const useTextFormat = (data: TextFormat) => {
    const [formattedText, setFormattedText] = useState<string>("");
    const { firstName, lastName, surName } = data;

    useEffect(() => {
        if (firstName || lastName || surName) {
            const capitalize = (text: string) => {
                return text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";
            }

            const formattedFirstName = capitalize(firstName);
            const formattedLastName = capitalize(lastName);
            const formattedSurName = capitalize(surName);

            const fullName = `${formattedSurName ? formattedSurName + "," : ""} ${formattedFirstName} ${formattedLastName}`.trim();
            setFormattedText(fullName);
        } else {
            setFormattedText("");
        }
    }, [data])

    return { formattedText };
}

export default useTextFormat;