class GuessingGame {
    constructor() {
        this.min = 0;
        this.max = 0;
        this.candidate = 0;
    }

    setRange(min, max) {
        this.min = min;
        this.max = max;
    }

    guess() {
        this.candidate = Math.round((this.min + this.max) / 2);
        return this.candidate;
    }

    lower() {
        // Если предыдущий кандидат был слишком большим, обновляем максимум
        this.max = this.candidate;
    }

    greater() {
        // Если предыдущий кандидат был слишком маленьким, обновляем минимум
        this.min = this.candidate;
    }
}

module.exports = GuessingGame;
