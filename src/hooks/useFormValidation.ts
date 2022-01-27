import { useState, useEffect } from 'react';

export const useFormValidation = (handleSubmit: () => void) => {
    const [errors, setErrors] = useState<string[]>([]);

    const validateField = (message: string, validateFunction: () => boolean) => {
        if (!validateFunction() && !(errors.indexOf(message) !== -1)) {
            setErrors([...errors, message]);
        } else if (errors.indexOf(message) !== -1) {
            setErrors([...errors].filter((error) => error !== message));
        }
    };

    useEffect(() => {
        if (!!!errors.length) {
            handleSubmit();
        }
    }, [errors]);

    const isRequired = (value: string) => {
        return !!value.trim();
    };

    const minMax = (value: string, min: number, max: number) => {
        return value.length >= min && value.length <= max;
    };

    const checkEmail = (value: string) => {
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(value);
    };

    return { isRequired, minMax, errors, setErrors, validateField, checkEmail };
};
