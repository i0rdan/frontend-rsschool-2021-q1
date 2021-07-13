import { GenerateHeaderMain } from './components/header/header';
import './styles.scss';

const store = window.localStorage;

export let words = [[['Action(SetA)'],['cry', 'dance', 'dive', 'draw', 'fly', 'hug', 'jump', 'walk'],['плакать', 'танцевать', 'нырять', 'рисовать', 'летать', 'обнимать', 'прыгать', 'гулять']],
          [['Action(SetB)'], ['open', 'play', 'point', 'ride', 'run', 'sing', 'skip', 'swim'],['открывать', 'играть', 'указывать', 'ехать', 'бежать', 'петь', 'скакать', 'плавать']],
          [['Action(SetC)'], ['argue', 'build', 'carry', 'catch', 'drive', 'drop', 'pull', 'push'],['спорить', 'строить', 'заботиться', 'ловить', 'водить', 'упасть', 'тянуть', 'толкать']],           
          [['Adjective'], ['big', 'fast', 'friendly', 'old', 'slow', 'small', 'unfriendly', 'young'],['большой', 'быстрый', 'дружелюбный', 'старый', 'медленный', 'маленький', 'недружелюбный', 'молодой']],
          [['Animal(SetA)'], ['cat', 'chick', 'chicken', 'dog', 'horse', 'pig', 'rabbit', 'sheep'],['кот', 'цыпленок', 'курица', 'собака', 'лошадь', 'свинка', 'кролик', 'овечка']],
          [['Animal(SetB)'], ['bird', 'dolphin', 'fish', 'frog', 'giraffe', 'lion', 'mouse', 'turtle'],['птичка', 'дельфин', 'рыба', 'лягушка', 'жираф', 'лев', 'мышь', 'черепаха']],
          [['Clothes'], ['blouse', 'boot', 'coat', 'dress', 'pants', 'shirt', 'shoe', 'skirt'],['блузка', 'сапоги', 'пальто', 'платье', 'штаны', 'рубашка', 'туфли', 'юбка']],
          [['Emotion'], ['angry', 'happy', 'laugh', 'sad', 'scared', 'smile', 'surprised', 'tired'],['злой', 'счастливый', 'смеятся', 'печальный', 'испуганный', 'улыбаться', 'удивленный', 'грустный']]];

window.onload = () => {
  //alert('Пожалуйста, очистите localStorage, перед проверкой приложения, командой localStorage.clear() в консоли. И перезапустите приложение) Спасибо');
  GenerateHeaderMain();
  GenerateStorage(words);
};

export function GenerateStorage(words:string[][][]) {
  if(!store.length) {
    for(let i = 0; i < words.length; i++){
      for(let j = 0; j < words[i][1].length; j++){
        store[words[i][1][j]] = JSON.stringify({word: words[i][1][j], translation: words[i][2][j], category: words[i][0][0], clicks: 0, correct: 0, wrong: 0, errors: 0});
      }
    }
  }
}

export function AddOneToWordStorage(word:string, prop:string) {
  let UpdatedWord = JSON.parse(store[word]);
  UpdatedWord[prop] = UpdatedWord[prop] + 1;

  if(prop === 'correct' || prop === 'wrong') {
    UpdatedWord.errors = UpdatedWord.wrong / (UpdatedWord.wrong + UpdatedWord.correct) * 100;
  }

  store[word] = JSON.stringify(UpdatedWord);
}