import translationsMap from "./translations/index.js"

export function useI18n() {
    const countryCode = document.getElementsByName("country_code")[0].value

    const availableTranslationsForCountry = Object.entries(translationsMap).reduce((acc, [key, value]) => {
        const [locale, country] = key.split('-')

        if (country === countryCode) {
            acc[locale] = value
        }

        return acc
    }, {})

    const [locale, translation] = Array.from(window.navigator.languages).reverse().reduce(function (acc, item) {
        const currentLocale = item.includes('-') ? item.split('-')[0] : item

        if (availableTranslationsForCountry[currentLocale]) {
            acc = [`${currentLocale}-${countryCode}`, availableTranslationsForCountry[currentLocale]]
        }
        return acc
    }, ['default', translationsMap['default']])

    const applyTranslation = (parent = 'body') => {
        const elementsWithTranslation = $(`${parent} *[data-translation-key]`)

        elementsWithTranslation.each((i, element) => {
            if (element.tagName.toLowerCase() === 'input') {
                $(element).attr('value', translation[$(element).data('translation-key') || ''])
            } else {
                $(element).text(translation[$(element).data('translation-key') || ''])
            }
        })
    }

    return {
        locale,
        translation,
        applyTranslation
    }
}