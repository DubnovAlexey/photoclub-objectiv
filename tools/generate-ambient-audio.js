/**
 * tools/generate-ambient-audio.js
 * ---------------------------------------------------------------
 * Генерирует assets/audio/ambient.wav — короткий бесшовный
 * эмбиент-луп (три синусоиды 220/330/440 Гц, кратные периоду 3 с,
 * поэтому петля склеивается без щелчка). Чистый Node.js: только
 * встроенные модули fs/path, ни одной npm-зависимости.
 *
 * Запуск:  node tools/generate-ambient-audio.js
 *      или npm run generate:audio
 * ---------------------------------------------------------------
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SAMPLE_RATE = 16000;
const DURATION_SEC = 3.0;
const CHANNELS = 1;
const BITS_PER_SAMPLE = 16;

function buildSamples() {
  const total = Math.round(SAMPLE_RATE * DURATION_SEC);
  const samples = new Int16Array(total);

  for (let i = 0; i < total; i++) {
    const t = i / SAMPLE_RATE;
    let value =
      0.5 * Math.sin(2 * Math.PI * 220 * t) +
      0.3 * Math.sin(2 * Math.PI * 330 * t) +
      0.2 * Math.sin(2 * Math.PI * 440 * t);
    value *= 0.28; // общая громкость — тихий фон
    value = Math.max(-1, Math.min(1, value));
    samples[i] = Math.round(value * 32767);
  }
  return samples;
}

/** Собирает canonical PCM WAV-контейнер вокруг готовых сэмплов. */
function encodeWav(samples) {
  const blockAlign = (CHANNELS * BITS_PER_SAMPLE) / 8;
  const byteRate = SAMPLE_RATE * blockAlign;
  const dataSize = samples.length * blockAlign;

  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write('RIFF', 0, 'ascii');
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8, 'ascii');
  buffer.write('fmt ', 12, 'ascii');
  buffer.writeUInt32LE(16, 16);              // размер под-чанка fmt
  buffer.writeUInt16LE(1, 20);               // AudioFormat = 1 (PCM)
  buffer.writeUInt16LE(CHANNELS, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(BITS_PER_SAMPLE, 34);
  buffer.write('data', 36, 'ascii');
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < samples.length; i++) {
    buffer.writeInt16LE(samples[i], 44 + i * 2);
  }
  return buffer;
}

const samples = buildSamples();
const wavBuffer = encodeWav(samples);

const outDir = path.join(__dirname, '..', 'assets', 'audio');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'ambient.wav');
fs.writeFileSync(outPath, wavBuffer);

console.log(`Готово: ${outPath}`);
console.log(`Размер: ${wavBuffer.length} байт, ${samples.length} сэмплов @ ${SAMPLE_RATE} Гц`);
