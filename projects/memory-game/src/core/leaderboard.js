import { LEADERBOARD_SIZE, STORAGE_KEY } from '../config.js';

function isValidResult(result) {
  return Number.isFinite(result?.moves) && Number.isFinite(result?.playedAt);
}

/** От меньшего числа ходов к большему; при равенстве выше более ранняя игра. */
function sortResults(results) {
  return [...results].sort((a, b) => a.moves - b.moves || a.playedAt - b.playedAt);
}

/** Возвращает сохранённые результаты (уже отсортированные, не более LEADERBOARD_SIZE). */
export function loadResults() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(parsed) ? sortResults(parsed.filter(isValidResult)).slice(0, LEADERBOARD_SIZE) : [];
  } catch {
    return [];
  }
}

/** Добавляет результат завершённой игры и оставляет лучшие LEADERBOARD_SIZE. */
export function addResult(moves, playedAt = Date.now()) {
  const results = sortResults([...loadResults(), { moves, playedAt }]).slice(0, LEADERBOARD_SIZE);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch {
    // хранилище недоступно (приватный режим, переполнение) — игра продолжается без сохранения
  }

  return results;
}
