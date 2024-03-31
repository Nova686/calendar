/**
 * FOnction permettant de définir un cookie
 *
 * @param valeur
 * @param jours
 * @param nom
 */
function setCookie(valeur, jours, nom = "chimpokomon") {
    const date = new Date();
    date.setTime(date.getTime() + (jours * 24 * 60 * 60 * 1000));
    const expiration = "expires=" + date.toUTCString();
    const valeurCookie = typeof valeur === "object" ? JSON.stringify(valeur) : valeur;

    document.cookie = nom + "=" + valeurCookie + ";" + expiration + ";path=/";
}

/**
 * Fonction permettant de récupérer un cookie
 *
 * @param nom
 * @returns {null|any|string}
 */
function getCookie(nom = "chimpokomon") {
    const nomCookie = nom + "=";
    const cookies = decodeURIComponent(document.cookie).split(';');
    for(let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.indexOf(nomCookie) === 0) {
            const valeur = cookie.substring(nomCookie.length, cookie.length);
            try {
                return JSON.parse(valeur);
            } catch (error) {
                return valeur;
            }
        }
    }
    return null;
}

/**
 * Fonction de suppression du cookie
 *
 * @param nom
 */
function deleteCookie(nom = "chimpokomon") {
    document.cookie = nom + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export default {setCookie, getCookie, deleteCookie}