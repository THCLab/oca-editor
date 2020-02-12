const hl = require('hashlink')

export const generateHashlink = async (data) => {
    let urls, meta = undefined;
    const codecs = ['mh-sha2-256', 'mb-base58-btc'];
    return await hl.encode({data, urls, codecs, meta});
}
