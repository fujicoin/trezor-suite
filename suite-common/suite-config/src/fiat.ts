export const fiatCurrencies = {
    usd: { label: 'usd', value: 'United States Dollar' },
    eur: { label: 'eur', value: 'Euro' },
    gbp: { label: 'gbp', value: 'Pound Sterling' },
    aed: { label: 'aed', value: 'Dirham' },
    ars: { label: 'ars', value: 'Argentine Peso' },
    aud: { label: 'aud', value: 'Australian Dollar' },
    bdt: { label: 'bdt', value: 'Bangladeshi taka' },
    bhd: { label: 'bhd', value: 'Bahraini dinar' },
    bmd: { label: 'bmd', value: 'Bermudian dollar' },
    brl: { label: 'brl', value: 'Brazilian real' },
    cad: { label: 'cad', value: 'Canadian dollar' },
    chf: { label: 'chf', value: 'Swiss franc' },
    clp: { label: 'clp', value: 'Chilean peso' },
    cny: { label: 'cny', value: 'Renminbi' },
    czk: { label: 'czk', value: 'Czech koruna' },
    dkk: { label: 'dkk', value: 'Danish krone' },
    hkd: { label: 'hkd', value: 'Hong Kong dollar' },
    huf: { label: 'huf', value: 'Hungarian forint' },
    idr: { label: 'idr', value: 'Indonesian rupiah' },
    ils: { label: 'ils', value: 'Israeli new shekel' },
    inr: { label: 'inr', value: 'Indian rupee' },
    jpy: { label: 'jpy', value: 'Japanese yen' },
    krw: { label: 'krw', value: 'South Korean won' },
    kwd: { label: 'kwd', value: 'Kuwaiti dinar' },
    lkr: { label: 'lkr', value: 'Sri Lankan rupee' },
    mmk: { label: 'mmk', value: 'Myanmar kyat' },
    mxn: { label: 'mxn', value: 'Mexican peso' },
    myr: { label: 'myr', value: 'Malaysian ringgit' },
    nok: { label: 'nok', value: 'Norwegian krone' },
    nzd: { label: 'nzd', value: 'New Zealand dollar' },
    php: { label: 'php', value: 'Philippine peso' },
    pkr: { label: 'pkr', value: 'Pakistani rupee' },
    pln: { label: 'pln', value: 'Polish złoty' },
    rub: { label: 'rub', value: 'Russian ruble' },
    sar: { label: 'sar', value: 'Saudi riyal' },
    sek: { label: 'sek', value: 'Swedish krona' },
    sgd: { label: 'sgd', value: 'Singapore dollar' },
    thb: { label: 'thb', value: 'Thai baht' },
    try: { label: 'try', value: 'Turkish lira' },
    twd: { label: 'twd', value: 'New Taiwan dollar' },
    vef: { label: 'vef', value: 'Venezuelan bolívar' },
    vnd: { label: 'vnd', value: 'Vietnamese dong' },
    zar: { label: 'zar', value: 'South African rand' },
    xdr: { label: 'xdr', value: 'XDR' },
    xag: { label: 'xag', value: 'XAG' },
    xau: { label: 'xau', value: 'XAU' },
} as const;

export type FiatCurrencyCode = keyof typeof fiatCurrencies;
export type FiatCurrency = typeof fiatCurrencies[FiatCurrencyCode];

/**
 * @deprecated Please use fiatCurrencies object instead
 */
export const FIAT = {
    tickers: [
        { symbol: 'eth', coingeckoId: 'ethereum' },
        { symbol: 'etc', coingeckoId: 'ethereum-classic' },
        { symbol: 'xrp', coingeckoId: 'ripple' },
        { symbol: 'ada', coingeckoId: 'cardano' },
        { symbol: 'btc', coingeckoId: 'bitcoin' },
        { symbol: 'ltc', coingeckoId: 'litecoin' },
        { symbol: 'bch', coingeckoId: 'bitcoin-cash' },
        { symbol: 'btg', coingeckoId: 'bitcoin-gold' },
        { symbol: 'dash', coingeckoId: 'dash' },
        { symbol: 'dgb', coingeckoId: 'digibyte' },
        { symbol: 'doge', coingeckoId: 'dogecoin' },
        { symbol: 'fjc', coingeckoId: 'fujicoin' },
        { symbol: 'vtc', coingeckoId: 'vertcoin' },
        { symbol: 'nmc', coingeckoId: 'namecoin' },
        { symbol: 'zec', coingeckoId: 'zcash' },
    ],
    currencies: Object.keys(fiatCurrencies),
} as const;
