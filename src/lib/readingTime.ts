import { visit } from 'unist-util-visit';
import { Node } from 'unist';
import { VFile } from 'vfile';

interface ReadingTimeData {
  text: string;
  time: number;
  words: number;
  minutes: number;
}

interface TextNode extends Node {
  type: 'text';
  value: string;
}

const WORDS_PER_MINUTE = 200;

function getReadingTime(text: string): ReadingTimeData {
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / WORDS_PER_MINUTE);
  return {
    text: `${time} min read`,
    time,
    words,
    minutes: time,
  };
}

export default function remarkReadingTime() {
  return (tree: Node, file: VFile) => {
    let textContent = '';

    visit(tree, 'text', (node: TextNode) => {
      textContent += node.value;
    });

    const readingTimeData = getReadingTime(textContent);
    file.data.readingTime = readingTimeData;
  };
}