const BASE58_ALPHABET = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
const base58 = require('base-x')(BASE58_ALPHABET)
const sha256 = require('js-sha256')

export const generateHashlink = (data) => {
    return base58.encode(
        Buffer.from(
            sha256.create().update(
                JSON.stringify(data)
            ).digest()
        )
    )
}
