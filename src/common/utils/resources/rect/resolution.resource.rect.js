function getRectResolutionResource() {
    return [
        {
            when: '${viewport.width < 1200}',
            string: {
                resolution: '_20x20.jpeg',
            },
        },
        {
            when: '${viewport.width < 500}',
            string: {
                resolution: '.jpg',
            },
        },
        {
            when: '${viewport.width >= 1200}',
            string: {
                resolution: '.jpg',
            },
        },
    ];
}
exports.getRectResolutionResource = getRectResolutionResource;
