function getRectExplainResource() {
    return [
        {
            dimensions: {
                titleFontSize: '@fontSizeXLarge',
            },
        },
        {
            when: '${viewport.width >= 480 && viewport.width < 1023 }',
            dimensions: {
                titleFontSize: '@fontSizeLarge',
            },
        },
        {
            when: '${viewport.width >= 1024 && viewport.width < 1280 }',
            dimensions: {
                titleFontSize: '@fontSizeXLarge',
            },
        },
        {
            when: '${viewport.width >= 1281 && viewport.width < 1920 }',
            dimensions: {
                titleFontSize: '@fontSize2XLarge',
            },
        },
    ];
}
exports.getRectExplainResource = getRectExplainResource;
