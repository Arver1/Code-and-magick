'use strict';
(function () {
  window.renderStatistics = (ctx, names, times) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);
    ctx.fillStyle = '#fff';
    ctx.fillRect(100, 10, 420, 270);
    ctx.fillStyle = '#000';
    ctx.font = 'PT Mono, 16px';
    ctx.fillText('Ура вы победили! Список результатов:', 130, 40);
    /*
    Из условия:
    Высота гистограммы 150px
    Ширина колонки 40px
    Расстояние между колонками 50px
    Цвет колонки игрока Вы rgba(255, 0, 0, 1)
    Цвета колонок других игроков — синие, а прозрачность задается случайным образом.
    */
    let factor = 150 / Math.max(...times);
    names.forEach((item, i)=> {
      let heightItem = factor * times[i];
      let x = 155 + i * 90;
      let y = 280 - 44 - heightItem;
      ctx.fillStyle = item === 'Вы' ? 'rgba(255, 0, 0, 1)' : `rgba(0, 0, 255, ${Math.random()})`;
      ctx.fillRect(x, y, 40, heightItem);
      ctx.fillStyle = '#000';
      ctx.fillText(`${times[i] ^ 0}`, x, y - 10);
      ctx.fillText(`${item}`, x, y + heightItem + 20);
    });
  };
})();
