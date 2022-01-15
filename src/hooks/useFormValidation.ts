import React, { useState } from 'react';

export const useFormValidation = () => {
    const [errors, setErrors] = useState<string[]>([]);

    const isRequired = (value: string, message: string) => {
        if (!value) {
            setErrors([...errors, message]);
        }
    };

    return { isRequired, errors };
};
