import React, { useState } from 'react';

export const useFormValidation = () => {
    const [errors, setErrors] = useState<string[]>([]);

    const isRequired = (value: string) => {
        if (!value) {
        }

        return true;
    };

    return [isRequired, errors];
};
