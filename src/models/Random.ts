export class Random {
    private x: number;
    private y: number;
    private z: number;
    private w: number;
    private _w: number;

    constructor(seed: number | null = null) {
        this.x = 234982382; // Famicom Release Date
        this.y = 906823471; // GameBoy Release Date
        this.z = 675012349; // Nintendo64 Release Date
        this.w = (seed ? seed : Math.floor(Math.random() * 0x100000000)) % 0x100000000;
        this._w = this.w;
    }

    seedNumber(): number {
        return this._w;
    }

    next(): number {
        const t = this.x ^ (this.x << 11);
        this.x = this.y; this.y = this.z; this.z = this.w;
        return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
    }

    random(): number {
        return Math.abs(this.next() / 0x100000000);
    }

    clone(): Random {
        return new Random(this._w);
    }
}