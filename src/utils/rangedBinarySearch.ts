/**
 * Recherche dichotomique qui à la première occurrence du terme recherché dans le dictionnaire
 * va prendre son index et faire une recherche linéaire
 * sur un intervalle de : indexOccurrence - RANGE à indexOccurrence + RANGE
 * @param {string[][]} dictionary
 * @param {string} query
 * @param {number} low
 * @param {number} high
 * @param {number} RANGE
 * @returns {string[] | []}
 */
export default function rangedBinarySearch(
  dictionary: string[][],
  query: string,
  low = 0,
  high = dictionary.length - 1,
  RANGE = 5,
): string[] {
  const results: string[] = [];
  while (high >= low) {
    // Définir le milieu de notre dictionnaire trié
    const mid = Math.floor(low + (high - low) / 2);

    // Si la chaîne de caractère à l'index du milieu commence par les mêmes caractères que ceux de notre recherche,
    // on crée un intervalle +10 -10, puis on effectue une recherche linéaire sur le range et
    // on insère dans le tableau 'results' les ids correspondants, et on retourne 'results"
    if (dictionary[mid][0].startsWith(query)) {
      const start = mid - RANGE < 0 ? 0 : mid - RANGE;
      const end =
        mid + RANGE > dictionary.length - 1
          ? dictionary.length - 1
          : mid + RANGE;
      for (let i = start; i <= end; i++) {
        dictionary[i][0].startsWith(query)
          ? results.push(dictionary[i][1])
          : '';
      }
      return results.flat();
    }

    if (query < dictionary[mid][0]) {
      // Notre chaîne de caractère recherchée est inférieur, c'est à dire
      // qu'elle se trouve alphabétiquement plus haut dans le dictionnaire (à gauche
      // si on se le représente comme un livre). Donc la nouvelle limite supérieure
      // est l'index du milieu -1 (on se débarrasse de la partie droite).
      high = mid - 1;
    } else {
      // Même logique, mais la chaîne de caractère recherchée est inférieur
      // On se débarrasse de la partie gauche du dictionnaire
      low = mid + 1;
    }
  }
  // Aucun résultat, on retourne results (array vide)
  return results;
}
