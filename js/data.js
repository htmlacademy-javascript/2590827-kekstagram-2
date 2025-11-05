import { getRandomInt } from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Артём', 'Мария', 'София', 'Кирилл', 'Анна', 'Максим', 'Полина', 'Даниил'];

function createComment(id) {
  const messageCount = getRandomInt(1, 2);
  let message = '';

  for (let i = 0; i < messageCount; i++) {
    const randomMessage = MESSAGES[getRandomInt(0, MESSAGES.length - 1)];
    message += `${randomMessage} `;
  }

  return {
    id: id,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: message.trim(),
    name: NAMES[getRandomInt(0, NAMES.length - 1)]
  };
}

function createPhoto(id) {
  const commentsCount = getRandomInt(0, 30);
  const comments = Array.from({ length: commentsCount }, (_, i) => createComment(i + 1));

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Это фото номер ${id}`,
    likes: getRandomInt(15, 200),
    comments: comments
  };
}

const photos = Array.from({ length: 25 }, (_, i) => createPhoto(i + 1));

export { photos };
