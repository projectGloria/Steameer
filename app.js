(function () {
  'use strict';
  if (document.getElementById('clean-market-root') || !globalThis.CleanMarketSteam) return;
  const C = globalThis.CleanMarketCore, S = globalThis.CleanMarketSteam, client = new S.Client();
  // Official icons from this machine's Steam application cache.
  const gameIcons = {"730":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQIAJQAlAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAgACADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAABAYHCAX/xAAtEAABAwMCBQIFBQAAAAAAAAABAgMEAAURBjEHEiFBYRQjExUigZEkMlFx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAYH/8QAJhEAAgEDAwIHAQAAAAAAAAAAAQIDAAQxBSGREYEGEiJBYaGx8P/aAAwDAQACEQMRAD8AoYpq0VaFvPouKykNNqISkpzzHG/jFKzaStaUJBKlEAAbmqrKkxLLZXpUj2IcRkuuYGeVKRk9BvU/8Oaet1OZXwnTb59uOlJtVuTDGEXLflSzjNwzgXyU/qSTd2bPHjR/1Kkwy6XME/UcKGT1xtms/aktmnoDLRsuoXrs8snmT6BTCUYxjJUrvk7A7dq72suK2pNSsvRHJXp7csuJ+E2kJLjalZCVnY4AA6Ad/wCaQKsFrFIigO3b+FDXZSdhWvtFRFSLyh0t8zTIKiSOgPb7/wCUyNXmPcLvMtMhtLkZaS0ARkL6EKB8Hr+K5Hq/kWmmGmciZMBcKsftB7/jFD6SWmFGut0Ww9IVFZKkttIK1r6EkJA3JwB96lumyPbPDZQn1MfM3cY4+6VXSCZZLiQbDYc55rL/ABEsCNMazutoZdDjMd32znJCFAKSD5AIB/ql2jr9OlXO9z51wChMkPrcdSoEFKiTkYO2NseKBqtoCFAbNEjnav/Z","570":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQIAJQAlAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAgACADAREAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAABgUIAgMEB//EACwQAAEDAwIEBQQDAAAAAAAAAAECAwQFBhEABxIhMUEIEyJRYXGBkbEUUoL/xAAaAQADAAMBAAAAAAAAAAAAAAAEBQYBAgcD/8QAMBEAAQIFAQYEBQUAAAAAAAAAAQIEAAMFESFhBhIxQVHwE3GBkSKhscHRFCNC4fH/2gAMAwEAAhEDEQA/AKNWLtnZ9RsCBWq44Yjj5UhTzsrykcQWoADPLOB01OOXjlLhUqUL20jpFMo1Mm05Dp2d0m+Sqw4kQwpWwdpNuF1TD81DqfQlx8lAH9gU4/Z0AuqOLWuBbSH0jZimg71ioHXHni0Y1TZqw6S6t6oBqE04OFDb8wtpSc9QSoE/TJGsy6i7mCyM+l41nbP0iQSqdZIPAFVh9YO7k7O27QbIqFUp0d5uVHShSFecVJIKwDyOexOimdQnTZ6Zazg6QqrGz7JqxmOJIO8LWzqBCzaKmQbs2ig06c03JikOMutk9Dxkg/B5g5699Av1rkPFLQbHB+UO6DKlPqOmROAKcgj1Psf9gZOqVz+H+sNwnuOsWo6smP5vIpGeaQrHpWPboeuPY9CG9VQVD4Zg498xE6uc+2XnCWr9yQeH4vyI6cDxh5Kpdn79UHzYzwTOaTydACZMY+y0905z8dcHPPStMx1SpllDB9j5RTLk03aeRvIPxDn/ACT5jmPl0Mat6YzlvbRyIcZovMoQxFWvIHAgFI4vykD/AFremkTngWo5yY12hBa0cykC4G6nyGM/K3rEdt3d7Vm+HlNaXFSHorzrLKV8hJcU4eE/bJB+EHXo6kFxUvCBwQCdBbv3gCk1BNP2f/UKTlJIGpJx3pD23Kpbu91jutONpkMLARIjOEebGX2we2OoV3/I0rnIn01xcGx5Hke+cUbVwy2gYlKhcHiOaT3wP9iK03xZdf2Su5p6M+80yolyDPa9IdR3SfkdCk/o6sWrmRUpJBF+o6d8jHJagwd7PuwpCiBxSocx0/I+0eq1a4p24Ph1q9YrEZtqQhQCFs5Sl0IcQAvHbnkY6ZT9tJJcpDSpJlSjj6XBi2nO5tU2cmuHIsR052Iz739o5Nst6bIou1cG2LjZkTCgOofY/ihxshTqlDnnsFD5z9tZe0x3NeKcSCBwtnSA6TXqZIpiGTwFXG4tcZJPXWFdj7u7RW+pxiksihBQ9bzkRQKx7FY4lH6HQLmn1SaLzDvev2wIcU+t0BsSluPD1KePrkxLXVvftZcNOVCq0tiqx21BQZVDcWOIZwU5T1wTz0M3pdRkr35Q3SdR+YMeV+huZfhz1BYHLdJzpiA+5O8lizNt51r26taUuxkpYQ1FU202Q4FcJ4sHPInOCPnTVnTnaXQcT+uc54Qhqlepa6ati0vkYsCAM3tnvWP/2Q==","440":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQIAJQAlAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAgACADAREAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAABQYBBwIDBAj/xAArEAABAwMCBAUFAQAAAAAAAAABAgMEBQYRABIHITGxE0FSYZEjUXGBocH/xAAZAQEBAQEBAQAAAAAAAAAAAAAFBgMBAAL/xAAkEQABAwUAAgMAAwAAAAAAAAABAgMEAAURITFhwRNBUdHh8P/aAAwDAQACEQMRAD8A8Z2LYr13SVrWssQGThx0Dmo+lPv20PcbimCnA2o8Hs07bLaqeoknCB0+hVpVC06Jbls1JyPT2N7UZxQcdSFrJ2nHM8+uo5qbJlSUBazsjQ0O+KtHYMWJFcKEDSTs7PPNJfCy0adcVKqa6hHDw8RLba8kKRgEnBH5Gn7xOeiuoDKsayanrLAZltOF5OdgDxQC+bGftCUlSVl+A6cNPEcwfSr376St1xTOQQdKHR7FF3K2rgKyDlB4fRo9aXFOHbtGj09dLcw0DucbcBKySSTggd9HTbO5KeU8HO/RFJwL01EZSyW+fYPa5r14pO1+OYVOQuLCcRh7xUjev288D+61t9nTGV8jxyocxwVlcb0qUn4mRhJ7np/qp4WXs1QX3KbNLbUJ9RcD6uWxeB1P2IHzrl4t6pKQ81tQ1j9FestxTFUWHdJO8/hp8u2oUW47WqMdupQ3lhouNhLySQpIyOWc+WP3qcgtSYspC1II3g6PDqqac7FlxXEJcSdZGx0brK0oFGuK16fIXTobyg0lte5hJIWnkfL7jP71ya5JiyVoCyN56eGvqA1GlxULLaTrB0OjVIPFKymaDIRUYQbahPqDfgJ5bF4PQfYgfOqSzXBUlJZc2obz+ipe9W5MVQea0k6x+H+KmyeFjtdjCbUnFxobiNzIaUN689D0IA/uvT7wmOr4mRlQ7nldt1lVJT8r5wk8x01vu7hdBtyjSKgmpu4bwENONglaicAZBHbWcG8OyngyWxv7zytZ9laiMqeDh19EdoDYt8v2hKWlSTIgPEFxkHmD6k+/fSNxtyZycjShw+jRdtuS4CyDtB6PYo9xSu2nXFTKWmnyA8N61uIIIUggADIP5Pxo6zwnorjheTjmPNJ3qczLabDKs7JPinWDd9Dty26e2/UWVKajNp8JlQWskJHkP90A5BlSpCyhB2Ts6HfNUTc+JEjIStY0BobPPFVXfF8P3fLSAksQWj9JknmT6le/b51Y263IgoJO1Hp9Coq5XJc9eOIHB7P+1X//2Q==","322330":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQIAJgAmAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAgACADAREAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAABgcICQX/xAAoEAACAgEEAgEEAgMAAAAAAAABAgMEBQYHERIIISIAExQxI0EJMlH/xAAZAQADAQEBAAAAAAAAAAAAAAADBAUGAQL/xAAtEQABAwIDBgYCAwAAAAAAAAABAgMRAAQhMUESE1FhgfAFFJGxwfEiI3Gh0f/aAAwDAQACEQMRAD8AhnY/Ym5u5FmdY6guWK+k8Zbjr2JElC2spck5ZKddnBX7hA5Zjz0Ug9WJVTNu7wMENpxUf6HE02wwXjJyrS7wp8edI6i0xTy0u1enKOIy8d+StkYJpb0kS17KwLDOZ+/8jgu3KMARG3xH6GffL7io3hMRy9qIpKUZUytYf4/NiN6dLLerYCtjo78IlrZbAH8SWMH2GUAdOf6IdD/YI5+g+ZvLaFJVI540MpE7KhjWWvl34V6t8PtR4++mUOf0rbmC0s9WjMLRTD5fZmTk9H4BIIJDAEjggqNDYeIovQUxChp8ihuNFA2tKZ+jLduTRSbMYijVp2MZcnvPesSyESPIscY+Cof5Ax78k8dGP66n6lPRvPNrMzh3y+asspMblNGktfW2wekKCYHcHKJNaMtG1To27FavHN8TxFEpLzSEykL0A9A8FTwwG0+HlmExr96CiO24bQCoz36miPXuktWnSGz2x+szawuGqYeXUF782cQRTyvekcQ2AZFTrGjxcns32izkgBewccdKRtIzy9e+8qTabQtRJyz9KBs9sFIdvtfaTw1t0wcOGOV/EtcHmzCY5IHUD0snRkiZ+B2Bf9/pVEXUONurzmOmR6aimHmEhKkJ4TVBbP7d6D8kNr8PrvE46quqUpCH8pT0d5kAWSCbgj/hUMRyvKsPXox7h16zeUwo/jPZFUWkNutJeAk109B3FGvs3BRoVb+c0lhrOeeMKawiyxEYgEiNJy3xEhdRzwGTngsvboOwlLhOCiANcKFcEq/UnrXf3T3LwGtcjpOpi83R1FqqjDez0Gq1lDRUcOkMkna4FVFiMkgFfr66e3PPH229fmpKi4IGAjiZ0/jPuaVY2m3BuxU5bieQFOhtJk87jbK07eSilgu4F5UnuVyjqrtKT2Kwydyiv8D2MPHPcj6bt7QqeCDiBkdPsf7Tdy8EoKiIPDX651L3ih5b6i8UtT38fax0uW0resBsliGYxyxSL8TLCT6V+OAQRwwUAkcBhoPEfDUX6QZhQyPwaiWd6q0JESD3IqgNlfIfS1Pe/EanoZWzFHdlMtxpZOjTyWBBHKk5duT0L9iffLQqR69iJcWT25UhQyy6Tl3rVtFywsI2TjJnrHtTW8k95ds9J6S1TW0zFhsRmNSVpWyl7GywxWJlVGZF4B5cyTfaDqFPaPv254H0jZ21y6tO8khOUz3gJ60R9xhkEpIk9+9Z77jbx2dwsLi9MYbFGpEzxvemTlpcjOpb7frj4IocgKP9jwzewONhbWYZUVqMnTlUG7vVXICYjjzr/9k=","620":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQIAJQAlAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAgACADAREAAhEBAxEB/8QAGQAAAwADAAAAAAAAAAAAAAAABgcIAAQJ/8QALBAAAQMEAQIFAgcAAAAAAAAAAQIDBAUGBxEhABIIIjFBURQVEyMyU2Fxkv/EABoBAAIDAQEAAAAAAAAAAAAAAAQFAAEGBwL/xAAoEQABBQABAwMDBQAAAAAAAAABAAIDBBExBSFBUWFiEiJxMkKBsfD/2gAMAwEAAhEDEQA/AJopKI1Bgtwac2IcRoaS21wP7PyT7k8nokduEPytv7s7++5/s9XpUxMO3rBqF81RTVPlIgxo0GI6+84pRHe40CAAPUkhR+OD/G2VOjLeeWRZ2HfUi6l1av0mIST6dJAAQFki0lwZlStuvIbllrQPmKkkFIUlaSeRwQR6EdB2IXwSOhk5CZ07UdyBtiH9LkXeEDIeF4F6zqrmGSG4cRhP0EB+G7JYkPFR2pYQlQISB+lXBKvfXQh3wjhnlWNd9Kxp4jPCjeGQo2Po1gqpLUp6j1BEdphckMoCm1JU2lIWhxX5fadgK3okgHryCQVfISfx6lBxzbjkSTHgVibARHjvOhJ/GWlK1pQoHXeAAo+uwO7RAJB6HSjaylHJE76ZCCB75pwjyuM9TmdJ1SeGwz64GkE/HQBoPj8cFRveGUXKxVZtQnyDOqT6tuEAJAIGgOOAAAAAPTXWFklfK8vkOkrrkEEdaJsMIxo4CN/ADhWws1ZJqUzI9y0+j25byGZKqbOlojfc3FqV2t96lDyDsJXrk7A43sDEooBXX42rKoWZcdTo1LzzbVuWdb1MclxbOpKIyhMdYaUptC1pkjuG0hKEBGk8cEgHqgcXpc8b5buq2cfYwyBRqk6uDTYDTAaCQpMF4knuKdaKXAQCVb9ACdFI60MrJ4a8FyN2gdh8Tp/tY2tNTs3LnTJo8c46fm0gDf44/wAUtsp5RpeRJkGqRrdYoNYU2r7m7EdJZluk8LSjXkPrvkk75JI2V1qyyy4SBgafOcE+ueE76dSkosMLpS9u/bvIHpvn2SjEwn36Xam+LPrD89TVMTXyDnKdVsd23YtNW2xRocGOqc4ydrmP9oVpZ9gjyp7flOyTpISzlvSPrMqt7NHPufU/hIq3SYorst9/d7uw39o9B+eSlR9YdevSxPcX/9k=","753":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDMTMuMzEzMiAyIDE0LjYxMzYgMi4yNTg2NiAxNS44MjY4IDIuNzYxMkMxNy4wNDAxIDMuMjYzNzUgMTguMTQyNSA0LjAwMDM1IDE5LjA3MTEgNC45Mjg5M0MxOS45OTk3IDUuODU3NTIgMjAuNzM2MiA2Ljk1OTkxIDIxLjIzODggOC4xNzMxN0MyMS43NDEzIDkuMzg2NDIgMjIgMTAuNjg2OCAyMiAxMkMyMiAxNC42NTIyIDIwLjk0NjQgMTcuMTk1NyAxOS4wNzExIDE5LjA3MTFDMTcuMTk1NyAyMC45NDY0IDE0LjY1MjIgMjIgMTIgMjJDNy40IDIyIDMuNTUgMTguOTIgMi4zNiAxNC43M0w2LjE5IDE2LjMxQzYuNDUgMTcuNiA3LjYgMTguNTggOC45NyAxOC41OEMxMC41MyAxOC41OCAxMS44IDE3LjMxIDExLjggMTUuNzVWMTUuNjJMMTUuMiAxMy4xOUgxNS4yOEMxNy4zNiAxMy4xOSAxOS4wNSAxMS41IDE5LjA1IDkuNDJDMTkuMDUgNy4zNCAxNy4zNiA1LjY1IDE1LjI4IDUuNjVDMTMuMiA1LjY1IDExLjUgNy4zNCAxMS41IDkuNDJWOS40N0w5LjEzIDEyLjkzTDguOTcgMTIuOTJDOC4zOCAxMi45MiA3LjgzIDEzLjEgNy4zOCAxMy40MUwyIDExLjJDMi40MyA2LjA1IDYuNzMgMiAxMiAyWk04LjI4IDE3LjE3QzkuMDggMTcuNSAxMCAxNy4xMyAxMC4zMyAxNi4zM0MxMC42NiAxNS41MyAxMC4yOCAxNC42MiA5LjUgMTQuMjlMOC4yMiAxMy43NkM4LjcxIDEzLjU4IDkuMjYgMTMuNTcgOS43OCAxMy43OUMxMC4zMSAxNCAxMC43MiAxNC40MSAxMC45MyAxNC45NEMxMS4xNSAxNS40NiAxMS4xNSAxNi4wNCAxMC45MyAxNi41NkMxMC41IDE3LjY0IDkuMjMgMTguMTYgOC4xNSAxNy43MUM3LjY1IDE3LjUgNy4yNyAxNy4xMiA3LjA2IDE2LjY3TDguMjggMTcuMTdaTTE3LjggOS40MkMxNy44IDEwLjgxIDE2LjY3IDExLjk0IDE1LjI4IDExLjk0QzEzLjkgMTEuOTQgMTIuNzcgMTAuODEgMTIuNzcgOS40MkMxMi43Njg3IDkuMDkwMDEgMTIuODMyNyA4Ljc2MzAzIDEyLjk1ODQgOC40NTc5QzEzLjA4NCA4LjE1Mjc4IDEzLjI2ODkgNy44NzU1NSAxMy41MDIyIDcuNjQyMjFDMTMuNzM1NiA3LjQwODg3IDE0LjAxMjggNy4yMjQwNCAxNC4zMTc5IDcuMDk4MzdDMTQuNjIzIDYuOTcyNyAxNC45NSA2LjkwODY4IDE1LjI4IDYuOTFDMTYuNjcgNi45MSAxNy44IDguMDQgMTcuOCA5LjQyWk0xMy40IDkuNDJDMTMuNCAxMC40NiAxNC4yNCAxMS4zMSAxNS4yOSAxMS4zMUMxNi4zMyAxMS4zMSAxNy4xNyAxMC40NiAxNy4xNyA5LjQyQzE3LjE3IDguMzggMTYuMzMgNy41MyAxNS4yOSA3LjUzQzE0LjI0IDcuNTMgMTMuNCA4LjM4IDEzLjQgOS40MloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="};
  const host = document.createElement('div'); host.id = 'clean-market-root';
  const shadow = host.attachShadow({ mode: 'closed' });
  // Static, local markup only. Item names and all Steam responses use textContent.
  shadow.innerHTML = `
  <style>
    :host{display:block;margin:10px 0;font:14px "Motiva Sans",Arial,Helvetica,sans-serif;color:#c7d5e0;color-scheme:dark}
    *{box-sizing:border-box}button,input,select{font:inherit}button{height:34px;padding:0 14px;border:0;border-radius:2px;cursor:pointer;background:#32465a;color:#dfe8ef;white-space:nowrap;transition:background .12s}button:hover:not(:disabled){background:#44617b;color:#fff}button:disabled{opacity:.38;cursor:default}button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid #66c0f4;outline-offset:2px}.primary{background:linear-gradient(90deg,#2b82b6,#27629a);color:#fff}.primary:hover:not(:disabled){background:linear-gradient(90deg,#3da6df,#347bba)}.danger{background:#803d46}.danger:hover:not(:disabled){background:#a14c58}
    input,select{height:34px;min-width:0;background:#101822;color:#dfe6ed;border:1px solid #35465a;border-radius:2px;padding:0 10px}select{cursor:pointer}input[type=checkbox]{width:16px;height:16px;margin:0;accent-color:#66c0f4;cursor:pointer}input[type=number]{width:66px;padding:0 6px;text-align:center;font-variant-numeric:tabular-nums}input[type=search]{width:230px;max-width:100%}input[type=text]{width:86px}label{display:flex;gap:6px;align-items:center}small,.muted{color:#8f9eac;font-size:12px}.row{display:flex;gap:10px;align-items:center}.between{justify-content:space-between}.stack{display:flex;flex-direction:column;gap:10px}[hidden]{display:none!important}.launch{background:linear-gradient(90deg,#253a4d,#1b2838);color:#67c1f5;border:1px solid #344b60}
    dialog{--row-size:64px;width:min(1120px,calc(100vw - 40px));height:min(820px,calc(100dvh - 56px));max-width:none;max-height:none;margin:auto;padding:0;overflow:hidden;border:1px solid #3b5268;border-top:2px solid #66c0f4;border-radius:3px;background:#1b2838;color:#c7d5e0;box-shadow:0 18px 80px #000c}dialog::backdrop{background:#000b}.shell{height:100%;min-height:0;display:flex;flex-direction:column;overflow:hidden}.window-header{flex:none;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:19px 24px 15px;background:linear-gradient(110deg,#24364a,#1b2838)}.eyebrow{font-size:10px;letter-spacing:1.6px;color:#66c0f4;text-transform:uppercase;margin-bottom:5px}h1{font-size:23px;font-weight:400;letter-spacing:.1px;color:#fff;margin:0}h2{font-size:16px;font-weight:400;color:#e7edf3;margin:0}.close{padding:0;width:30px;height:30px;background:transparent;font-size:24px;color:#899aaa;align-self:flex-start}.close:hover:not(:disabled){background:#3d4b58}
    .tabs{flex:none;display:flex;gap:24px;height:42px;margin:0 24px;border-bottom:1px solid #354456}.tabs button{height:42px;padding:0 2px;border-radius:0;background:transparent;color:#8f9eac;border-bottom:2px solid transparent}.tabs button[aria-pressed=true]{color:#fff;border-bottom-color:#66c0f4}.tabs button:hover:not(:disabled){background:transparent;color:#fff}.settings-grid{flex:none;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:24px;padding:16px 24px 12px}.control-group{display:flex;align-items:flex-end;gap:8px;min-width:0}.control-group>label{flex:1;min-width:0;display:flex;flex-direction:column;align-items:stretch;gap:6px;font-size:10px;letter-spacing:.7px;color:#8f9eac;text-transform:uppercase}.control-group select,.control-group input{font-size:13px;letter-spacing:0;text-transform:none}.field-actions{display:flex;gap:6px}.currency-chip{align-self:flex-end;line-height:34px;white-space:nowrap;color:#8f9eac;font-size:11px}.selection-toolbar{flex:none;display:flex;gap:8px;align-items:center;padding:0 24px 12px}.search-wrap{flex:1;min-width:100px}.search-wrap input{width:100%;background:#141f2b}.selection-toolbar button{font-size:12px;background:#26394b}.selection-count{white-space:nowrap;color:#66c0f4;font-size:12px;margin-left:auto}
    .status{flex:none;margin:0 24px 10px;min-height:16px;max-height:34px;overflow:hidden;font-size:12px;line-height:17px;color:#8fa6b8;text-overflow:ellipsis;white-space:nowrap}.status.error{color:#f1a3a6;white-space:normal}.status.good{color:#8fbc86}dialog[data-stage=preview] .status,dialog[data-stage=progress] .status{margin-top:10px}.table-wrap{flex:1;min-height:0;overflow:hidden;background:#16202d;border:1px solid #2d3e51;margin:0 24px}.table-wrap table{width:100%;border-collapse:collapse;table-layout:fixed;font-size:13px}.table-wrap th{height:32px;padding:0 12px;color:#879bad;font-size:11px;font-weight:400;text-align:left;background:#202f40;border-bottom:1px solid #354557}.table-wrap td{height:var(--row-size);padding:6px 12px;border-bottom:1px solid #293a4b;vertical-align:middle}.table-wrap tbody tr:nth-child(even){background:#1a2736}.table-wrap tbody tr:hover{background:#26394c}.table-wrap tr[data-selected=true]{background:#263c50}.table-wrap td.num,.table-wrap th.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}.items-table th:first-child,.items-table td:first-child{width:42px;text-align:center}.items-table[data-kind=sell] th:nth-last-child(2){width:94px;text-align:right}.items-table[data-kind=sell] th:last-child{width:96px;text-align:right}.items-table[data-kind=cancel] th:last-child{width:180px;text-align:right}.preview-table th:not(:first-child){width:130px;text-align:right}.preview-table th:nth-child(2){width:68px}.preview-table th.num{white-space:normal;line-height:11px}
    .item{display:flex;align-items:center;gap:13px;min-width:0}.item-art{position:relative;display:flex;align-items:center;justify-content:center;flex:0 0 64px;width:64px;height:48px;background:radial-gradient(ellipse at center,#304052,#182431);border:1px solid #34475b;border-radius:2px}.item-art img{width:100%;height:100%;object-fit:contain}.item-fallback{font-size:22px;color:#6b8197}.item-name{min-width:0;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:18px;color:#d5e1ec}.empty{padding:28px;text-align:center;color:#8194a6;font-size:13px}.pagination{flex:none;display:flex;align-items:center;justify-content:space-between;gap:10px;margin:8px 24px;color:#8194a6;font-size:11px;min-height:26px}.pagination .page-buttons{display:flex;gap:5px;align-items:center}.pagination button{height:26px;padding:0 10px;font-size:11px;background:#26394b}.page-label{font-variant-numeric:tabular-nums}.actionbar{flex:none;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 24px 16px;border-top:1px solid #304154;background:#192535}.actionbar .primary,.actionbar .danger{height:38px;padding:0 22px}.action-copy{font-size:12px;color:#8194a6;line-height:17px}.footer{flex:none;display:flex;justify-content:space-between;padding:0 24px 10px;color:#62798d;font-size:10px}.preview,.progress{flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden}.section-title{flex:none;padding:2px 24px 10px}.summary{flex:none;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;margin:0 24px 14px;background:#16212e;border:1px solid #35495c}.summary-stat{padding:12px 16px;border-right:1px solid #304154}.summary-stat:last-child{border:0}.summary-label{font-size:10px;color:#8195a7;letter-spacing:.6px;text-transform:uppercase;margin-bottom:6px}.summary-value{font-size:21px;color:#fff;font-weight:400;font-variant-numeric:tabular-nums}.summary-stat.net .summary-value{color:#a4d781}.preview-hint{flex:none;margin:0;padding:0 24px 10px;font-size:11px;line-height:16px;color:#8298ac}.jobs{flex:1;min-height:0;overflow:hidden;margin:0 24px;background:#16202d;border:1px solid #304154}.job{height:var(--row-size);padding:8px 12px;border-bottom:1px solid #304154;display:grid;grid-template-columns:minmax(0,1fr) 115px minmax(0,1fr);align-items:center;gap:14px;font-size:12px}.job>span{overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.job[data-status=failed],.job[data-status=unknown]{color:#f1a3a6}.job[data-status=done]{color:#a4d781}.job[data-status=confirmation]{color:#d7c17a}.progress-top{flex:none;padding:4px 24px 12px;display:flex;align-items:center;justify-content:space-between;gap:12px}.progress-top h2{font-size:14px}a{color:#66c0f4}
    @media(max-width:800px){.settings-grid{grid-template-columns:1fr;gap:10px;padding-top:12px}.control-group>label{flex:1}.currency-chip{font-size:10px}.preview-table th:not(:first-child){width:85px}.preview-table th:nth-child(2){width:50px}.table-wrap td,.table-wrap th{padding-left:8px;padding-right:8px}.summary-stat{padding:10px}.summary-value{font-size:18px}.selection-toolbar button{padding:0 10px}.item{gap:9px}.preview-table .item-art{flex-basis:44px;width:44px;height:36px}.job{grid-template-columns:minmax(0,1fr) 100px minmax(0,1fr);gap:8px}}
    @media(max-width:560px){dialog{width:calc(100vw - 16px);height:calc(100dvh - 24px)}.window-header{padding:12px 14px 10px}h1{font-size:20px}.eyebrow{font-size:9px}.tabs{margin:0 14px;height:36px}.tabs button{height:36px}.settings-grid{padding:10px 14px}.selection-toolbar{padding:0 14px 8px;gap:5px}.selection-toolbar button{padding:0 7px;font-size:11px}.selection-count{display:none}.status{margin:0 14px 8px}.table-wrap{margin:0 14px}.pagination{margin:6px 14px}.actionbar{padding:10px 14px}.footer{padding:0 14px 8px}.section-title{padding-left:14px}.summary{margin:0 14px 10px}.summary-stat{padding:9px 7px}.summary-value{font-size:16px}.summary-label{font-size:8px}.preview-hint{padding:0 14px 8px}.preview-table{font-size:11px!important}.preview-table th:not(:first-child){width:68px;font-size:9px}.preview-table th:nth-child(2){width:32px;padding-left:4px;padding-right:4px}.preview-table .item{gap:6px}.preview-table .item-art{display:flex;flex-basis:32px;width:32px;height:28px}input[type=number]{width:56px}.items-table[data-kind=sell] th:nth-last-child(2){width:62px}.items-table[data-kind=sell] th:last-child{width:74px}.items-table[data-kind=cancel] th:last-child{width:112px}.item-art{flex-basis:48px;width:48px;height:42px}.item-name{font-size:12px;line-height:16px}.jobs{margin:0 14px}.progress-top{padding-left:14px;padding-right:14px}.progress-top .row{gap:5px}.progress-top button{padding:0 8px;font-size:11px}.job{grid-template-columns:minmax(0,1fr) 94px;gap:6px}.job>span:last-child{display:none}}
    @media(max-height:650px){dialog{--row-size:48px;height:calc(100dvh - 20px)}.window-header{padding-top:10px;padding-bottom:9px}h1{font-size:20px}.eyebrow{margin-bottom:3px}.tabs,.tabs button{height:34px}.settings-grid{padding-top:8px;padding-bottom:8px}.control-group>label{gap:4px}.selection-toolbar{padding-bottom:8px}.status{margin-bottom:6px}.table-wrap td{padding-top:4px;padding-bottom:4px}.item-art{height:36px;flex-basis:48px;width:48px}.summary-stat{padding-top:8px;padding-bottom:8px}.summary-value{font-size:18px}.summary{margin-bottom:8px}.actionbar{padding-top:8px;padding-bottom:8px}.footer{padding-bottom:6px}.section-title{padding-bottom:8px}.preview-hint{font-size:10px;line-height:14px}}
    .items-table[data-kind=sell] th:nth-child(3){width:85px}.items-table[data-kind=sell] th:nth-child(4){width:90px}.items-table[data-kind=sell] th:last-child{width:120px}
    .review-toolbar{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:2px 24px 10px;flex:none}.review-toolbar .section-title{padding:0}.sort-control{width:174px;flex:none;font-size:12px}.loading-progress{flex:none;margin:0 24px 10px;display:flex;align-items:center;gap:12px;font-size:11px;color:#8fa6b8}.loading-progress progress{flex:1;min-width:0}.batch-meter{flex:none;margin:0 24px 12px}.batch-meter small{display:block;margin-top:6px;font-variant-numeric:tabular-nums}progress{display:block;width:100%;height:10px;border:0;border-radius:2px;overflow:hidden;background:#101923;accent-color:#66c0f4}progress::-webkit-progress-bar{background:#101923}progress::-webkit-progress-value{background:linear-gradient(90deg,#287db2,#66c0f4);transition:width .18s}.paired-price{display:flex;justify-content:flex-end;align-items:center;gap:5px;flex-wrap:wrap;line-height:17px}.paired-price span{white-space:nowrap}.paired-price .net{color:#93ae87}.table-wrap td.price-pair{white-space:normal}.preview-table[data-kind=cancel] th:nth-child(2){width:68px}.preview-table[data-kind=cancel] th:last-child{width:240px}.items-table[data-kind=cancel] th:last-child{width:240px}.preview-table[data-kind=cancel] th:first-child{width:auto}.items-table[data-kind=cancel] th:nth-child(3){width:60px;text-align:right}
    @media(max-width:800px){.preview-table[data-kind=cancel] th:last-child,.items-table[data-kind=cancel] th:last-child{width:185px}.selection-toolbar{flex-wrap:wrap}.selection-toolbar .search-wrap{min-width:130px}.selection-count{font-size:11px}.sort-control{width:155px}.preview-table[data-kind=cancel] th:nth-child(2){width:50px}}
    @media(max-width:560px){.items-table[data-kind=sell] th:nth-child(3){width:48px}.items-table[data-kind=sell] th:nth-child(4){width:68px}.items-table[data-kind=sell] th:last-child{width:76px}.items-table th.num{white-space:normal;font-size:9px}.review-toolbar{padding:2px 14px 8px}.review-toolbar h2{font-size:14px}.sort-control{width:145px;font-size:11px}.selection-toolbar .search-wrap{min-width:110px}.loading-progress,.batch-meter{margin-left:14px;margin-right:14px}.preview-table[data-kind=cancel] th:last-child,.items-table[data-kind=cancel] th:last-child{width:135px}.preview-table[data-kind=cancel] th:nth-child(2){width:32px}.paired-price{gap:2px;font-size:11px}}
    .ui-icon{width:16px;height:16px;flex:none;display:inline-block;vertical-align:middle;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.with-icon{display:inline-flex;gap:8px;align-items:center;justify-content:center}.launch{height:54px;padding:0 15px 0 9px;display:inline-flex;gap:12px;align-items:center;border:1px solid #437aa0;border-radius:4px;background:linear-gradient(110deg,#254b67,#1d3449);box-shadow:0 3px 12px #0004;color:#e3f4ff;text-align:left}.launch:hover:not(:disabled){background:linear-gradient(110deg,#30678c,#244962);border-color:#66c0f4}.launch-emblem{height:34px;width:34px;display:grid;place-items:center;border-radius:4px;background:#66c0f41c;color:#83cffa}.launch-emblem .ui-icon{width:22px;height:22px}.launch-copy{display:flex;flex-direction:column;gap:3px}.launch-copy strong{font-size:14px;font-weight:500}.launch-copy small{font-size:10px;letter-spacing:.25px;color:#91b3ca}.launch-arrow{margin-left:14px;color:#66c0f4}.item-copy{min-width:0;display:flex;flex-direction:column;gap:4px}.item-copy .item-name{-webkit-line-clamp:1}.item-meta{display:flex;gap:5px;align-items:center;min-width:0;color:#788fa3;font-size:10px;line-height:14px}.item-meta img{width:14px;height:14px;border-radius:2px;flex:none}.item-meta span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.picker{position:relative;min-width:0}.picker-trigger{display:flex;align-items:center;gap:8px;width:100%;height:34px;padding:0 10px;background:#141f2b;border:1px solid #3b5268;color:#d6e4ee;text-align:left;justify-content:flex-start;font-size:13px;letter-spacing:0;text-transform:none}.picker-trigger:hover:not(:disabled){background:#20374b}.picker-trigger[aria-expanded=true]{border-color:#66c0f4;background:#20374b}.picker-trigger .picker-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}.picker-trigger .ui-icon:last-child{width:12px}.game-icon{width:22px;height:22px;border-radius:3px;object-fit:cover;flex:none}.picker-menu{position:fixed;z-index:100;min-width:210px;padding:6px;border:1px solid #4a657d;border-radius:4px;background:#1c3042;box-shadow:0 10px 35px #0009;overflow:hidden}.picker-option{width:100%;height:40px;padding:0 10px;display:flex;gap:10px;align-items:center;text-align:left;color:#d7e6f2;background:transparent;font-size:13px}.picker-option[aria-selected=true]{background:#315b78;color:#fff}.picker-option:hover:not(:disabled),.picker-option:focus-visible{background:#3a6787;outline-offset:-2px}.picker-option .option-label{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.picker-option .ui-icon{width:15px}.picker-page-nav{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:6px;color:#90a9bd;font-size:11px}.picker-page-nav button{height:28px;padding:0 10px}.selection-toolbar .picker-trigger{background:#152638}.selection-toolbar{position:relative}.control-group label .picker{width:100%}.table-wrap:has(.empty:not([hidden])){background:linear-gradient(120deg,#16202d,#1a2938)}.jobs .job:last-child,.table-wrap tbody tr:last-child td{border-bottom:0}
    @media(max-width:560px){.with-icon{gap:5px}.ui-icon{width:14px;height:14px}.field-actions button{padding:0 9px;font-size:12px}.field-actions .ui-icon{display:none}.item-meta{display:none}.picker-trigger{font-size:11px;padding:0 7px;gap:5px}.picker-trigger .game-icon{width:20px;height:20px}.selection-toolbar button{padding-left:7px;padding-right:7px}.selection-toolbar .sort-control .picker-trigger>.ui-icon:first-child{display:none}.item-copy{gap:0}.item-copy .item-name{-webkit-line-clamp:2}}
    .table-wrap table{color:inherit}.review-actions{gap:8px}.review-actions #refresh-prices{height:38px}.review-actions #refresh-prices:disabled .ui-icon{animation:refresh-turn 1s linear infinite}@keyframes refresh-turn{to{transform:rotate(360deg)}}@media(max-width:560px){#preview .actionbar{flex-wrap:wrap}.review-actions{gap:5px;margin-left:auto}.review-actions #refresh-prices{padding:0 9px;font-size:12px}.actionbar .review-actions .primary{padding:0 12px}.actionbar #discard{padding:0 9px;font-size:12px}}
    .launch-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center}.launch.secondary{border-color:#3a5872;background:linear-gradient(110deg,#1e3346,#172635)}.launch.secondary:hover:not(:disabled){background:linear-gradient(110deg,#284863,#1f3549);border-color:#66c0f4}.launch.secondary .launch-emblem{background:#8fbc8624;color:#a4d781}.inv-stat{margin-left:auto;font-size:11px;font-variant-numeric:tabular-nums;color:#c7d5e0;white-space:nowrap;flex:none}.inv-stat .net{color:#a4d781}.inv-stat.muted{color:#8fa6b8}.picker-trigger .inv-stat{font-size:11px;margin-right:2px}.picker-menu-header{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:4px 6px 8px;margin-bottom:4px;border-bottom:1px solid #354c61;font-size:11px;color:#8fa6b8}.picker-menu-header button{height:26px;padding:0 10px;font-size:11px;background:#27445c}
    .window-tools{display:flex;align-items:flex-start;gap:14px}.theme-control{display:flex;flex-direction:column;align-items:stretch;gap:5px;font-size:10px;color:#8f9eac}.theme-control .picker{width:124px}.theme-control .picker-trigger{height:30px;font-size:12px}
    @media(max-width:560px){.window-tools{gap:8px}.theme-control .picker{width:90px}.window-header{gap:10px}}
    @media(max-width:400px){.window-header{flex-wrap:wrap}.window-tools{margin-left:auto}.tabs{gap:10px}.tabs button{font-size:12px}.preview-table th:not(:first-child){width:58px}.preview-table th:nth-child(2){width:26px}.preview-table .item-art{display:none}}
    /* Adapted from Minimal Dark 6.2.5: config.css, webkit.css, scrollbar.css,
       and its corner/OLED variants. Inherit the user's active Millennium values. */
    :host([data-theme="black"]){
      --cm-bg:var(--minimal_dark_blacker_alt,#121212);--cm-panel:var(--minimal_dark_blacker,#191919);
      --cm-raised:var(--minimal_dark_black,#1e1e1e);--cm-field:var(--minimal_dark_blacker_alt1,#101010);
      --cm-border:var(--minimal_dark_be_grey,#262626);--cm-border-strong:var(--minimal_dark_greyblack,#2e2e2f);
      --cm-text:var(--minimal_dark_less_white,#dcdcdc);--cm-muted:var(--minimal_dark_topgrey1,#b9bec4);--cm-faint:var(--minimal_dark_topgrey,#8b929a);
      --cm-accent:var(--minimal_dark_color1,var(--minimal_dark_color,var(--SystemAccentColorAccent,var(--SystemAccentColor,#1a9fff))));
      --cm-green:var(--minimal_dark_status_green,#06e39d);--cm-progress:var(--minimal_dark_progress_bar,#21d083);
      --cm-red:var(--minimal_dark_red2,#f12446);--cm-warning:#f7a24b;--cm-radius:var(--minimal_dark_corner,5px);color:var(--cm-text)
    }
    :host([data-theme="black"]) dialog{background:var(--cm-bg);color:var(--cm-text);border:1px solid var(--cm-border);border-top-color:var(--cm-accent);border-radius:var(--cm-radius);box-shadow:0 18px 60px #0009}
    :host([data-theme="black"]) dialog::backdrop{background:#000b}
    :host([data-theme="black"]) :is(.window-header,.actionbar){background:var(--cm-bg);border-color:var(--cm-border)}
    :host([data-theme="black"]) :is(h1,h2,.summary-value,.item-name){color:var(--cm-text)}
    :host([data-theme="black"]) :is(button,input,select,.picker-menu,.item-art,.game-icon,.launch-emblem,.item-meta img,progress){border-radius:var(--cm-radius)}
    :host([data-theme="black"]) button{background:var(--cm-panel);border:1px solid var(--cm-border);color:var(--cm-text);transition:background .25s ease-out,border-color .25s ease-out,color .25s ease-out}
    :host([data-theme="black"]) button:hover:not(:disabled){background:var(--cm-raised);border-color:var(--cm-accent);color:var(--cm-accent)}
    :host([data-theme="black"]) :is(button,input,select):focus-visible{outline:2px solid var(--cm-accent);outline-offset:2px}
    :host([data-theme="black"]) .primary{background:var(--cm-bg);border-color:var(--cm-progress);color:var(--cm-progress)}
    :host([data-theme="black"]) .primary:hover:not(:disabled){background:var(--cm-progress);border-color:var(--cm-progress);color:#101010}
    :host([data-theme="black"]) .danger{background:var(--cm-bg);border-color:var(--cm-red);color:var(--cm-red)}
    :host([data-theme="black"]) .danger:hover:not(:disabled){background:var(--cm-red);border-color:var(--cm-red);color:#fff}
    :host([data-theme="black"]) .close{background:transparent;border-color:transparent;color:var(--cm-faint)}
    :host([data-theme="black"]) .close:hover:not(:disabled){background:var(--cm-panel);border-color:var(--cm-red);color:var(--cm-red)}
    :host([data-theme="black"]) :is(input,select,.picker-trigger,.selection-toolbar .picker-trigger){background:var(--cm-field);border-color:var(--cm-border);color:var(--cm-text)}
    :host([data-theme="black"]) input[type=checkbox]{accent-color:var(--cm-accent)}
    :host([data-theme="black"]) input::placeholder{color:var(--cm-faint);opacity:1}
    :host([data-theme="black"]) :is(.picker-trigger:hover:not(:disabled),.picker-trigger[aria-expanded=true]){background:var(--cm-panel);border-color:var(--cm-accent);color:var(--cm-text)}
    :host([data-theme="black"]) .picker-menu{background:var(--cm-panel);border-color:var(--cm-border);box-shadow:0 10px 30px #0009}
    :host([data-theme="black"]) .picker-option{background:transparent;border:1px solid transparent;color:var(--cm-text)}
    :host([data-theme="black"]) .picker-option[aria-selected=true]{background:var(--cm-raised);border-left-color:var(--cm-accent);color:var(--cm-accent)}
    :host([data-theme="black"]) :is(.picker-option:hover:not(:disabled),.picker-option:focus-visible){background:var(--cm-border);border-color:var(--cm-accent);color:var(--cm-accent)}
    :host([data-theme="black"]) .tabs{border-color:var(--cm-border)}
    :host([data-theme="black"]) .tabs button{background:transparent;border:0;border-bottom:2px solid transparent;border-radius:0;color:var(--cm-faint)}
    :host([data-theme="black"]) .tabs button[aria-pressed=true]{border-bottom-color:var(--cm-accent);color:var(--cm-text)}
    :host([data-theme="black"]) .tabs button:hover:not(:disabled){background:transparent;color:var(--cm-accent)}
    :host([data-theme="black"]) :is(.eyebrow,.selection-count,.launch-arrow,a){color:var(--cm-accent)}
    :host([data-theme="black"]) :is(.theme-control,.control-group>label,.status,.currency-chip,small,.muted,.preview-hint,.loading-progress,.action-copy,.empty,.pagination,.picker-page-nav,.picker-menu-header,.summary-label,.item-meta,.inv-stat.muted){color:var(--cm-faint)}
    :host([data-theme="black"]) .footer{color:var(--cm-faint)}
    :host([data-theme="black"]) :is(.table-wrap,.table-wrap:has(.empty:not([hidden])),.summary,.jobs){background:var(--cm-bg);border-color:var(--cm-border)}
    :host([data-theme="black"]) .table-wrap th{background:var(--cm-panel);border-color:var(--cm-border);color:var(--cm-muted)}
    :host([data-theme="black"]) :is(.table-wrap td,.summary-stat,.job,.picker-menu-header){border-color:var(--cm-border)}
    :host([data-theme="black"]) .table-wrap tbody tr:nth-child(even){background:var(--cm-bg)}
    :host([data-theme="black"]) .table-wrap tbody tr:hover{background:var(--cm-panel)}
    :host([data-theme="black"]) .table-wrap tr[data-selected=true]{background:var(--cm-raised);box-shadow:inset 2px 0 var(--cm-accent)}
    :host([data-theme="black"]) .item-art{background:var(--cm-panel);border-color:var(--cm-border)}
    :host([data-theme="black"]) .item-fallback{color:var(--cm-faint)}
    :host([data-theme="black"]) .inv-stat{color:var(--cm-text)}
    :host([data-theme="black"]) :is(.net,.inv-stat .net,.summary-stat.net .summary-value,.status.good,.job[data-status=done]){color:var(--cm-green)}
    :host([data-theme="black"]) :is(.status.error,.job[data-status=failed],.job[data-status=unknown]){color:var(--cm-red)}
    :host([data-theme="black"]) .job[data-status=confirmation]{color:var(--cm-warning)}
    :host([data-theme="black"]) progress{background:var(--cm-border);accent-color:var(--cm-progress)}
    :host([data-theme="black"]) progress::-webkit-progress-bar{background:var(--cm-border)}
    :host([data-theme="black"]) progress::-webkit-progress-value{background:var(--cm-progress)}
    :host([data-theme="black"]) :is(.launch,.launch.secondary){background:var(--cm-bg);border-color:var(--cm-border);color:var(--cm-text);box-shadow:none}
    :host([data-theme="black"]) :is(.launch,.launch.secondary):hover:not(:disabled){background:var(--cm-panel);border-color:var(--cm-accent);color:var(--cm-text)}
    :host([data-theme="black"]) .launch-emblem{background:var(--cm-panel);color:var(--cm-accent)}
    :host([data-theme="black"]) .launch.secondary .launch-emblem{background:var(--cm-panel);color:var(--cm-green)}
    :host([data-theme="black"]) .launch-copy small{color:var(--cm-faint)}
    :host([data-theme="black"]) *{scrollbar-color:var(--cm-raised) transparent;scrollbar-width:thin}
    :host([data-theme="black"]) ::-webkit-scrollbar{width:12px;height:12px}
    :host([data-theme="black"]) ::-webkit-scrollbar-track{background:transparent}
    :host([data-theme="black"]) ::-webkit-scrollbar-thumb{background:var(--cm-raised);border:2px solid transparent;background-clip:padding-box;border-radius:8px}
    :host([data-theme="black"]) ::-webkit-scrollbar-thumb:hover{background-color:var(--cm-accent)}
    @media(prefers-reduced-motion:reduce){:host([data-theme="black"]) button{transition:none}}
    .brand{display:flex;align-items:center;gap:12px;min-width:0}.brand-icon{width:44px;height:44px;object-fit:contain;flex:none}.brand .eyebrow{letter-spacing:.6px}@media(max-width:560px){.brand-icon{width:32px;height:32px}.brand{gap:8px}.brand .eyebrow{font-size:9px}.footer{flex-wrap:wrap;gap:4px 12px}}
  </style>
  <div class="launch-bar"><button class="launch" id="open" type="button">Bulk sell / cancel</button><button class="launch secondary" id="check-inventories-page" type="button">Check inventories</button></div>
  <dialog id="dialog" aria-labelledby="title"><div class="shell">
    <header class="window-header"><div class="brand"><img class="brand-icon" src="data:image/png;base64,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" alt="" width="44" height="44"><div><div class="eyebrow">Steam Community · Market Manager</div><h1 id="title">Steameer</h1></div></div><div class="window-tools"><label class="theme-control"><span>Theme</span><select id="theme" aria-label="Theme"><option value="default">Default</option><option value="black">Black</option></select></label><button class="close" id="close" aria-label="Close" title="Close">×</button></div></header>
    <nav class="tabs" aria-label="Market actions"><button id="sell-tab" aria-pressed="true">Sell items</button><button id="cancel-tab" aria-pressed="false">Active listings</button><button id="relist-tab" aria-pressed="false">Relist items</button></nav>
    <div class="settings-grid" id="settings">
      <div id="inventory-controls" class="control-group"><label>Inventory<select id="inventory"><option value="730/2">Counter-Strike 2</option><option value="440/2">Team Fortress 2</option><option value="570/2">Dota 2</option><option value="753/6">Steam Community items</option></select></label><div class="field-actions"><button id="load">Load items</button><button id="check-inventories" title="Calculate sellable item count and total price (with and without fees) for your inventories">Check values</button><button id="sell-all" class="primary">Sell all…</button></div></div>
      <div id="listing-controls" class="control-group" hidden><button id="load-listings">Refresh active listings</button><small>Sell listings only</small></div>
      <div id="price-controls" class="control-group"><label>Selling price<select id="mode"><option value="match">Match lowest listing</option><option value="undercut">Undercut lowest listing</option><option value="fixed">Fixed buyer price</option></select></label><label id="amount-label" hidden><span id="amount-text">By</span><input id="amount" type="text" inputmode="decimal" value="0.01" aria-label="Price amount"></label><small id="currency" class="currency-chip">Steam wallet</small></div>
    </div>
    <div class="selection-toolbar" id="selection-controls"><select id="sort" class="sort-control" aria-label="Sort items"><option value="name">Name</option><option value="asc">Price: low to high</option><option value="desc">Price: high to low</option></select><label class="search-wrap"><input id="search" type="search" placeholder="Search items" aria-label="Filter items"></label><button id="select">Select all</button><button id="clear">Clear</button><span id="selection" class="selection-count">0 selected</span></div>
    <div id="status" class="status" role="status" aria-live="polite">Load your inventory to begin.</div>
    <div id="load-progress-wrap" class="loading-progress" hidden><progress id="load-progress" aria-label="Loading progress"></progress><span id="load-progress-text"></span></div>
    <div class="table-wrap" id="data-table"><table class="items-table" id="items-table" data-kind="sell"><thead id="thead"></thead><tbody id="rows"></tbody></table><div id="empty" class="empty">Your marketable items will appear here.</div></div>
    <div id="pager" class="pagination"><span id="page-info" class="page-label"></span><div class="page-buttons"><button id="prev" aria-label="Previous items page">‹ Previous</button><button id="next" aria-label="Next items page">Next ›</button></div></div>
    <div id="prepare-controls" class="actionbar"><div class="action-copy"><span id="count">No inventory loaded</span><br><span id="page-detail">Choose the items and quantities to list.</span></div><button class="primary" id="prepare" disabled>Review selected items</button></div>
    <section id="preview" class="preview" hidden aria-label="Batch preview"><div class="review-toolbar"><h2 id="preview-title" class="section-title">Review listings</h2><select id="preview-sort" class="sort-control" aria-label="Sort review"><option value="name">Name</option><option value="asc">Price: low to high</option><option value="desc">Price: high to low</option></select></div><div id="totals" class="summary"></div><div class="table-wrap" id="preview-table-wrap"><table class="preview-table"><thead id="preview-head"></thead><tbody id="preview-rows"></tbody></table></div><div class="pagination"><span id="preview-page-info" class="page-label"></span><div class="page-buttons"><button id="preview-prev">‹ Previous</button><button id="preview-next">Next ›</button></div></div><p id="preview-hint" class="preview-hint">Steam confirmations may be required. These prices stay fixed for this batch.</p><div class="actionbar"><button id="discard">‹ Back to items</button><div class="row review-actions"><button id="refresh-prices">Refresh prices</button><button class="primary" id="commit">List items</button></div></div></section>
    <section id="progress" class="progress" hidden><div class="progress-top"><h2 id="progress-title">Batch progress</h2><div class="row"><button id="pause">Pause</button><button id="stop" class="danger">Stop batch</button></div></div><div class="batch-meter"><progress id="batch-progress" max="1" value="0" aria-label="Batch progress"></progress><small id="batch-progress-text"></small></div><div id="jobs" class="jobs" role="log" aria-live="polite"></div><div class="pagination"><span id="job-page-info" class="page-label"></span><div class="page-buttons"><button id="job-prev">‹ Previous</button><button id="job-next">Next ›</button></div></div><div class="actionbar"><button id="export">Save batch report</button><button id="back-items">Back to items</button></div></section>
    <footer class="footer"><span>Steameer · 1.0 by NihilGPT</span><span id="session-note">Review first. List when ready.</span></footer>
  </div></dialog>`;
  (document.querySelector('#mainContents, .market_page_fullwidth, .market_page, .inventory_page, main, [role="main"], .responsive_page_template_content') || document.body).prepend(host);
  const $ = id => shadow.getElementById(id);
  const state = { tab:'sell', stage:'select', rows:[], selected:new Map(), page:0, pageSize:6, previewPage:0, previewSize:6, jobPage:0, jobSize:6, followJobs:true, sort:'name', busy:false, checkingInventories:false, stopInventoryCheck:false, previewNeedsRefresh:false, preview:null, jobs:[], dirty:false, context:null, inventoryStats:new Map(), inventoryCache:new Map() };
  const queue = new C.Queue({ update: renderProgress });
  const jobLabels = { queued:'Waiting', working:'Sending…', done:'Done', failed:'Rejected', unknown:'Check Steam', confirmation:'Confirm in Steam' };
  let reportUrl = null;
  const journalKey = 'clean-market-last-action';
  const themeKey = 'clean-market-theme';
  let layoutFrame = null;
  const pickers = new Map();
  const iconPaths={
    market:'<path d="M3 9h18l-2-5H5L3 9Zm1 0v11h16V9M8 20v-7h8v7M3 9c0 4 4 4 4 0 0 4 5 4 5 0 0 4 5 4 5 0 0 4 4 4 4 0"/>',
    theme:'<path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z"/>',
    sell:'<path d="m3 12 9-9h7l2 2v7l-9 9-9-9Z"/><circle cx="16.5" cy="7.5" r="1"/>',
    list:'<path d="M8 5h13M8 12h13M8 19h13M3 5h.1M3 12h.1M3 19h.1"/>',
    review:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M8 13l3 3 5-6"/>',
    cancel:'<circle cx="12" cy="12" r="9"/><path d="m8 8 8 8M16 8l-8 8"/>',
    refresh:'<path d="M20 7a8 8 0 0 0-14-1L3 9m0-6v6h6M4 17a8 8 0 0 0 14 1l3-3m0 6v-6h-6"/>',
    select:'<path d="m3 6 2 2 3-3M11 6h10M3 13l2 2 3-3M11 13h10M3 20l2 2 3-3M11 20h10"/>',
    clear:'<path d="m6 6 12 12M18 6 6 18"/>',pause:'<path d="M8 4v16M16 4v16"/>',play:'<path d="m7 4 14 8-14 8V4Z"/>',stop:'<rect x="5" y="5" width="14" height="14" rx="1"/>',
    download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',back:'<path d="m10 5-7 7 7 7M3 12h18"/>',arrow:'<path d="m14 5 7 7-7 7M3 12h18"/>',chevron:'<path d="m6 9 6 6 6-6"/>',check:'<path d="m4 12 5 5L20 6"/>',sortAsc:'<path d="M4 5h6M4 12h11M4 19h16"/>',sort:'<path d="M4 5h16M4 12h11M4 19h6"/>',game:'<rect x="2" y="6" width="20" height="13" rx="4"/><path d="M7 10v5M4.5 12.5h5M16 11h.1M19 14h.1"/>'
  };
  function iconNode(name,cls=''){
    const span=document.createElement('span');if(cls)span.className=cls;span.setAttribute('aria-hidden','true');
    span.innerHTML=`<svg class="ui-icon" viewBox="0 0 24 24" focusable="false">${iconPaths[name]||iconPaths.list}</svg>`;return span;
  }
  function pickerIcon(id,value){
    if(id==='theme')return 'theme';
    if(id==='mode')return 'sell';
    if(value==='name')return 'list';
    if(value==='asc')return 'sortAsc';
    return 'sort';
  }
  function buttonLabel(id,label,icon){const button=$(id);button.classList.add('with-icon');button.replaceChildren(iconNode(icon),document.createTextNode(label));}
  function gameName(appid,fallback=''){
    return globalThis.g_rgAppContextData?.[appid]?.name || fallback || ({730:'Counter-Strike 2',570:'Dota 2',440:'Team Fortress 2',753:'Steam Community',322330:"Don't Starve Together",620:'Portal 2'})[appid] || 'Steam game';
  }
  function gameImage(appid){
    let url=gameIcons[appid] || '';
    const raw=globalThis.g_rgAppContextData?.[appid]?.icon;
    if(raw)try{const u=new URL(raw);if(u.protocol==='https:'&&/(?:^|\.)steamstatic\.com$/.test(u.hostname)&&u.pathname.includes(`/public/images/apps/${appid}/`))url=u.href;}catch{}
    if(!url)return null;
    const image=document.createElement('img');image.className='game-icon';image.alt='';image.src=url;image.addEventListener('error',()=>{if(gameIcons[appid]&&image.src!==gameIcons[appid])image.src=gameIcons[appid];else image.hidden=true;});return image;
  }
  function optionBaseLabel(option){
    if(!option)return 'Choose';
    if(!option.dataset.baseLabel)option.dataset.baseLabel=option.textContent;
    return option.dataset.baseLabel;
  }
  function inventoryStatNode(stat){
    if(!stat)return null;
    const span=document.createElement('span');
    if(stat.status==='loading'||stat.status==='error'){
      span.className='inv-stat muted';span.textContent=stat.progressText||(stat.status==='error'?'Unavailable':'Checking…');
      if(stat.title)span.title=stat.title;
      return span;
    }
    if(stat.status!=='done')return null;
    const buyerText=money(stat.totalBuyer),sellerText=money(stat.totalSeller);
    span.className='inv-stat';
    span.title=`${stat.sellableCount} sellable item${stat.sellableCount===1?'':'s'} (${stat.typeCount} type${stat.typeCount===1?'':'s'}) · With fees: ${buyerText} · Without fees (you receive): ${sellerText}${stat.unavailable?` · ${stat.unavailable} unpriced`:''}`;
    span.append(document.createTextNode(`${stat.sellableCount} (${buyerText} / `));
    const net=document.createElement('span');net.className='net';net.textContent=sellerText;
    span.append(net,document.createTextNode(')'));
    return span;
  }
  function closePickers(){for(const picker of pickers.values()){picker.menu.hidden=true;picker.button.setAttribute('aria-expanded','false');}}
  function syncPickers(){
    for(const [id,picker] of pickers){
      const select=$(id),option=select.options[select.selectedIndex];picker.button.disabled=select.disabled;picker.button.replaceChildren();
      const art=id==='inventory'?gameImage(select.value.split('/')[0]):iconNode(pickerIcon(id,select.value));if(art)picker.button.append(art);
      const label=document.createElement('span');label.className='picker-label';label.textContent=id==='inventory'?optionBaseLabel(option):(option?.textContent || 'Choose');picker.button.append(label);
      if(id==='inventory'&&option){const statNode=inventoryStatNode(state.inventoryStats.get(option.value));if(statNode)picker.button.append(statNode);}
      picker.button.append(iconNode('chevron'));
      picker.button.setAttribute('aria-label',`${id==='theme'?'Theme':id==='inventory'?'Inventory':id==='mode'?'Selling price':id==='sort'?'Sort items':'Sort review'}: ${option?.textContent||label.textContent}`);
      if(id==='inventory'&&!picker.menu.hidden)picker.renderMenu?.(picker.page);
    }
  }
  function initPicker(id){
    const select=$(id),wrapper=document.createElement('div');wrapper.className=`picker ${select.classList.contains('sort-control')?'sort-control':''}`;
    select.before(wrapper);wrapper.append(select);select.hidden=true;
    const button=document.createElement('button');button.type='button';button.id=`${id}-toggle`;button.className='picker-trigger';button.setAttribute('aria-haspopup','listbox');button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',`${id}-menu`);
    const menu=document.createElement('div');menu.id=`${id}-menu`;menu.className='picker-menu';menu.hidden=true;menu.setAttribute('role','listbox');menu.setAttribute('aria-label',select.getAttribute('aria-label')||id);
    wrapper.append(button);$('dialog').append(menu);const picker={button,menu,wrapper,page:0,renderMenu:null};pickers.set(id,picker);
    function renderMenu(page=0){
      picker.page=page;menu.replaceChildren();
      const rect=button.getBoundingClientRect(),bounds=$('dialog').getBoundingClientRect();
      const below=bounds.bottom-rect.bottom-12,above=rect.top-bounds.top-12;
      const available=Math.max(below,above),size=Math.max(1,Math.min(8,Math.floor((available-(id==='inventory'?86:50))/40))),pages=Math.ceil(select.options.length/size);
      const start=Math.min(page,pages-1)*size;
      if(id==='inventory'){
        const head=document.createElement('div');head.className='picker-menu-header';
        const hint=document.createElement('span');hint.textContent='Sellable · With / without fees';
        const chk=document.createElement('button');chk.type='button';chk.className='with-icon';
        chk.replaceChildren(iconNode(state.checkingInventories?'stop':'refresh'),document.createTextNode(state.checkingInventories?'Stop check':'Check all'));
        chk.disabled=state.busy&&!state.checkingInventories;
        chk.addEventListener('click',e=>{e.stopPropagation();checkInventories();});
        head.append(hint,chk);menu.append(head);
      }
      for(const option of [...select.options].slice(start,start+size)){
        const row=document.createElement('button');row.type='button';row.className='picker-option';row.setAttribute('role','option');row.setAttribute('aria-selected',String(select.value===option.value));row.dataset.value=option.value;
        const art=id==='inventory'?gameImage(option.value.split('/')[0]):iconNode(pickerIcon(id,option.value));if(art)row.append(art);
        const text=document.createElement('span');text.className='option-label';text.textContent=id==='inventory'?optionBaseLabel(option):option.textContent;row.append(text);
        if(id==='inventory'){const statNode=inventoryStatNode(state.inventoryStats.get(option.value));if(statNode)row.append(statNode);}
        if(select.value===option.value)row.append(iconNode('check'));
        row.addEventListener('click',()=>{select.value=option.value;closePickers();select.dispatchEvent(new Event('change',{bubbles:true}));syncPickers();button.focus();});menu.append(row);
      }
      if(pages>1){const nav=document.createElement('div');nav.className='picker-page-nav';const prev=document.createElement('button'),next=document.createElement('button'),label=document.createElement('span');prev.textContent='Previous';next.textContent='Next';prev.disabled=page===0;next.disabled=page>=pages-1;label.textContent=`${page+1} / ${pages}`;prev.addEventListener('click',()=>open(page-1));next.addEventListener('click',()=>open(page+1));nav.append(prev,label,next);menu.append(nav);}
      menu.style.width=`${Math.min(Math.max(rect.width,id==='inventory'?390:220),bounds.width-20)}px`;
      menu.style.left=`${Math.max(bounds.left+8,Math.min(rect.left,bounds.right-menu.getBoundingClientRect().width-8))}px`;
      const h=menu.getBoundingClientRect().height;menu.style.top=`${below>=h?rect.bottom+5:Math.max(bounds.top+8,rect.top-h-5)}px`;
    }
    picker.renderMenu=renderMenu;
    function open(page=0){
      closePickers();menu.hidden=false;button.setAttribute('aria-expanded','true');renderMenu(page);
    }
    button.addEventListener('click',()=>{if(menu.hidden)open();else closePickers();});
    button.addEventListener('keydown',event=>{if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();open();menu.querySelector('[aria-selected=true],.picker-option')?.focus();}});
    menu.addEventListener('keydown',event=>{
      if(event.key==='Escape'){event.preventDefault();event.stopPropagation();closePickers();button.focus();}
      if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();const options=[...menu.querySelectorAll('.picker-option')],index=options.indexOf(shadow.activeElement);options[(index+(event.key==='ArrowDown'?1:options.length-1))%options.length]?.focus();}
    });
    select.addEventListener('change',syncPickers);
  }
  shadow.addEventListener('pointerdown',event=>{if(![...pickers.values()].some(p=>p.wrapper.contains(event.target)||p.menu.contains(event.target)))closePickers();});
  shadow.addEventListener('keydown',event=>{if(event.key==='Escape'){const open=[...pickers.values()].find(p=>!p.menu.hidden);if(open){event.preventDefault();event.stopPropagation();closePickers();open.button.focus();}}});
  document.addEventListener('pointerdown',event=>{if(!event.composedPath().includes(host))closePickers();});
  function applyTheme(value, { persist = false } = {}) {
    const theme = value === 'black' ? 'black' : 'default';
    host.dataset.theme = theme; $('theme').value = theme;
    if (theme === 'black') document.documentElement.dataset.cleanMarketTheme = theme;
    else delete document.documentElement.dataset.cleanMarketTheme;
    if (persist) try { localStorage.setItem(themeKey, theme); } catch {}
    closePickers(); syncPickers(); scheduleLayout();
  }
  $('theme').addEventListener('change', () => applyTheme($('theme').value, { persist:true }));
  window.addEventListener('storage', event => {
    if (event.key !== themeKey && event.key !== null) return;
    try { if (event.storageArea === localStorage) applyTheme(event.newValue); } catch {}
  });
  function note(text, kind = '') { $('status').textContent = text; $('status').title = text; $('status').className = `status ${kind}`;scheduleLayout(); }
  function money(n) { return new Intl.NumberFormat(undefined, { style:'currency', currency:state.context.code }).format(n / 100); }
  function cell(row, text, cls = '') { const td = document.createElement('td'); td.textContent = text; td.className = cls; row.append(td); return td; }
  function header(target, columns) { target.replaceChildren(); const tr = document.createElement('tr'); for (const name of columns) { const th = document.createElement('th'); th.textContent = name === 'Select' ? '' : name; if (name === 'Select') th.setAttribute('aria-label','Select items'); if (/Available|Quantity|price|pays|receive/i.test(name)) th.className='num'; tr.append(th); } target.append(tr); }
  function itemContent(item) {
    const content = document.createElement('div'); content.className = 'item';
    const art = document.createElement('span'); art.className = 'item-art'; art.setAttribute('aria-hidden','true');
    const fallback = document.createElement('span'); fallback.className = 'item-fallback'; fallback.textContent = '◇';
    if (item.image) {
      const image = document.createElement('img'); image.alt = ''; image.loading = 'lazy'; image.decoding = 'async'; image.src = item.image;
      fallback.hidden = true; image.addEventListener('error',()=>{ image.hidden=true; fallback.hidden=false; }); art.append(image);
    }
    art.append(fallback); content.append(art);
    const name = document.createElement('span'); name.className = 'item-name'; name.textContent = item.name; name.title = item.name;
    if (/^#[a-fA-F0-9]{6}$/.test(item.nameColor || '')) name.style.color = item.nameColor;
    const copy=document.createElement('div');copy.className='item-copy';copy.append(name);
    if(item.appid){const meta=document.createElement('div');meta.className='item-meta';const icon=gameImage(item.appid);if(icon)meta.append(icon);const title=document.createElement('span');title.textContent=gameName(item.appid,item.gameName);meta.append(title);copy.append(meta);}
    content.append(copy); return content;
  }
  function itemCell(row, item) { cell(row,'','name').append(itemContent(item)); }
  function showStage(stage) {
    if(state.stage!==stage)closePickers();state.stage = stage; $('dialog').dataset.stage = stage;
    for (const id of ['settings','data-table','selection-controls','prepare-controls','pager']) $(id).hidden = stage !== 'select';
    $('preview').hidden = stage !== 'preview'; $('progress').hidden = stage !== 'progress';scheduleLayout();
  }
  function pageSlice(items, key, sizeKey, info, prev, next) {
    const size = state[sizeKey], pages = Math.max(1,Math.ceil(items.length / size)); state[key] = Math.min(Math.max(0,state[key]),pages - 1);
    const start = state[key] * size, end = Math.min(start + size,items.length);
    const unit = info === 'job-page-info' ? (state.tab === 'sell' ? 'Requests' : 'Listings') : (state.tab === 'sell' ? 'Types' : 'Listings');
    $(info).textContent = items.length ? `${unit} ${start + 1}–${end} of ${items.length} · Page ${state[key] + 1} of ${pages}` : 'No items';
    $(prev).disabled = state[key] === 0; $(next).disabled = state[key] >= pages - 1;
    return items.slice(start,end);
  }
  function invalidate() {
    state.preview = null; state.previewNeedsRefresh=false; state.previewPage = 0; showStage('select'); $('session-note').textContent = 'Review first. List when ready.';
  }
  function ordered(items, price) {
    return [...items].sort((a,b) => {
      if (state.sort === 'name') return a.name.localeCompare(b.name);
      const x=price(a),y=price(b);
      if (x === null || x === undefined) return y === null || y === undefined ? a.name.localeCompare(b.name) : 1;
      if (y === null || y === undefined) return -1;
      return (state.sort === 'asc' ? x-y : y-x) || a.name.localeCompare(b.name);
    });
  }
  function filtered() { const term = $('search').value.trim().toLocaleLowerCase(); return ordered(state.rows.filter(r => r.name.toLocaleLowerCase().includes(term)),r=>state.tab==='sell'?r.referencePrice:r.buyer); }
  function loading(current,total,label) {
    $('load-progress-wrap').hidden=false;$('load-progress-text').textContent=label;
    if(total){$('load-progress').max=total;$('load-progress').value=current;}else $('load-progress').removeAttribute('value');
  }
  function priceCell(row,item) {
    const td=cell(row,'','num price-pair'),pair=document.createElement('div');pair.className='paired-price';
    const buyer=document.createElement('span');buyer.textContent=item.buyer===null||item.buyer===undefined?'Unavailable':state.context.code?money(item.buyer):item.buyerText;
    const net=document.createElement('span');net.className='net';net.textContent=`(${item.seller===null||item.seller===undefined?'—':state.context.code?money(item.seller):item.sellerText})`;
    pair.title='Sell price (you receive after Steam fees)';pair.append(buyer,net);td.append(pair);
  }
  function ensurePageStyle(){
    if(document.getElementById('clean-market-page-style'))return;
    const style=document.createElement('style');style.id='clean-market-page-style';
    style.textContent='.games_list_tab[data-cm-valued="true"]{height:auto!important;min-height:44px;padding-top:5px!important;padding-bottom:5px!important}.games_list_tab[data-cm-valued="true"] .games_list_tab_name{display:block!important;float:none!important;line-height:17px!important;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.games_list_tab[data-cm-valued="true"] .games_list_tab_number{display:block!important;float:none!important;line-height:15px!important;font-size:11px!important;color:#c7d5e0!important;white-space:nowrap;font-variant-numeric:tabular-nums}.games_list_tab[data-cm-valued="true"] .games_list_tab_number .cm-net{color:#a4d781}.games_list_tab[data-cm-valued="true"] .games_list_tab_number.cm-muted{color:#8fa6b8!important}';
    style.textContent+='html[data-clean-market-theme="black"] .games_list_tab[data-cm-valued="true"] .games_list_tab_number{color:var(--minimal_dark_less_white,#dcdcdc)!important}html[data-clean-market-theme="black"] .games_list_tab[data-cm-valued="true"] .games_list_tab_number .cm-net{color:var(--minimal_dark_status_green,#06e39d)}html[data-clean-market-theme="black"] .games_list_tab[data-cm-valued="true"] .games_list_tab_number.cm-muted{color:var(--minimal_dark_topgrey,#8b929a)!important}';
    (document.head||document.documentElement).append(style);
  }
  function renderPageCheckButton(subText=''){
    const btn=$('check-inventories-page');if(!btn)return;
    btn.disabled=state.busy&&!state.checkingInventories;
    btn.replaceChildren(iconNode(state.checkingInventories?'stop':'sell','launch-emblem'));
    const copy=document.createElement('span');copy.className='launch-copy';
    const title=document.createElement('strong');title.textContent=state.checkingInventories?'Stop checking':'Check inventories';
    const sub=document.createElement('small');
    if(subText)sub.textContent=subText;
    else{
      const done=[...state.inventoryStats.values()].filter(s=>s.status==='done');
      if(done.length&&state.context?.code){
        const items=done.reduce((a,s)=>a+s.sellableCount,0),buyer=done.reduce((a,s)=>a+s.totalBuyer,0),seller=done.reduce((a,s)=>a+s.totalSeller,0);
        sub.textContent=`${items} sellable (${money(buyer)} / ${money(seller)})`;
      }else sub.textContent='Sellable count · Total with & without fees';
    }
    copy.append(title,sub);btn.append(copy);
  }
  function discoverInventories(){
    const appData = globalThis.g_rgAppContextData || {};
    const tabApps = [...document.querySelectorAll('a[id^="inventory_link_"], a.games_list_tab[href^="#"]')].map(a => a.id?.match(/^inventory_link_(\d+)$/)?.[1] || a.getAttribute('href')?.replace(/^#/, '')).filter(id => /^\d+$/.test(id || ''));
    const allAppIds = [...new Set([...tabApps, ...Object.keys(appData).filter(id => /^\d+$/.test(id))])];
    if (!allAppIds.length) {
      for (const option of $('inventory').options) optionBaseLabel(option);
      return;
    }
    const currentVal = $('inventory').value;
    const built = [];
    for (const appid of allAppIds) {
      const app = appData[appid] || {};
      const tabName = document.querySelector(`a[id="inventory_link_${appid}"] .games_list_tab_name, a.games_list_tab[href="#${appid}"] .games_list_tab_name`)?.textContent?.trim();
      const baseAppName = app.name || tabName || gameName(appid);
      const rawCtxs = Object.entries(app.rgContexts || {}).filter(([cid]) => /^\d+$/.test(cid) && cid !== '0' && !(appid === '753' && cid === '1'));
      const nonEmpty = rawCtxs.filter(([, ctx]) => Number(ctx?.asset_count ?? 1) > 0);
      const list = nonEmpty.length ? nonEmpty : rawCtxs.length ? rawCtxs : [[appid === '753' ? '6' : '2', {}]];
      for (const [contextid, ctx] of list) {
        const value = `${appid}/${contextid}`;
        if (built.some(o => o.value === value)) continue;
        const cleanName = list.length === 1 ? baseAppName : `${baseAppName} — ${ctx?.name || contextid}`;
        const option = document.createElement('option');
        option.value = value; option.textContent = cleanName; option.dataset.baseLabel = cleanName;
        built.push(option);
      }
    }
    if (built.length) {
      $('inventory').replaceChildren(...built);
      const active = globalThis.g_ActiveInventory;
      if (currentVal && built.some(o => o.value === currentVal)) $('inventory').value = currentVal;
      else if (active && built.some(o => o.value === `${active.appid}/${active.contextid}`)) $('inventory').value = `${active.appid}/${active.contextid}`;
    }
  }
  function syncSteamPageInventories(){
    const byApp=new Map();
    for(const [val,stat] of state.inventoryStats){
      const appid=val.split('/')[0];
      if(!byApp.has(appid)||val===`${appid}/6`||val===`${appid}/2`)byApp.set(appid,stat);
    }
    if(!byApp.size)return;
    ensurePageStyle();
    for(const [appid,stat] of byApp){
      const tabs=document.querySelectorAll(`a[id="inventory_link_${appid}"], a.games_list_tab[href="#${appid}"]`);
      for(const tab of tabs){
        const nameNode=tab.querySelector('.games_list_tab_name');
        let numNode=tab.querySelector('.games_list_tab_number');
        if(!numNode){numNode=document.createElement('span');numNode.className='games_list_tab_number';tab.append(numNode);}
        if(!numNode.dataset.originalCount)numNode.dataset.originalCount=numNode.textContent.trim();
        if(nameNode&&nameNode.nextElementSibling!==numNode)nameNode.after(numNode);
        tab.dataset.cmValued='true';
        if(stat.status==='done'||(stat.status==='loading'&&stat.sellableCount!=null&&stat.totalBuyer!=null)){
          const buyerText=money(stat.totalBuyer),sellerText=money(stat.totalSeller);
          numNode.classList.toggle('cm-muted',stat.status!=='done');
          numNode.replaceChildren(document.createTextNode(`${stat.sellableCount} (${buyerText} / `));
          const net=document.createElement('span');net.className='cm-net';net.textContent=sellerText;
          numNode.append(net,document.createTextNode(stat.suffix?` · ${stat.suffix})`:')'));
          const orig=numNode.dataset.originalCount?` · Total inventory: ${numNode.dataset.originalCount.replace(/[()]/g,'')}`:'';
          tab.title=`${stat.sellableCount} sellable item${stat.sellableCount===1?'':'s'} (${stat.typeCount} type${stat.typeCount===1?'':'s'}) · With fees: ${buyerText} · Without fees (you receive): ${sellerText}${orig}`;
        }else{
          numNode.classList.add('cm-muted');
          numNode.textContent=stat.progressText||(stat.status==='error'?'Unavailable':'Checking…');
        }
      }
      const respOpt=document.querySelector(`#responsive_inventory_select option[value="${appid}"]`);
      if(respOpt&&stat.status==='done'){
        if(!respOpt.dataset.baseLabel)respOpt.dataset.baseLabel=respOpt.textContent.replace(/\s*\(\d+\)\s*$/,'').trim();
        respOpt.textContent=`${respOpt.dataset.baseLabel} — ${stat.sellableCount} (${money(stat.totalBuyer)} / ${money(stat.totalSeller)})`;
      }
    }
  }
  function syncInventoryViews(subText=''){
    for(const option of $('inventory').options){
      const base=optionBaseLabel(option),stat=state.inventoryStats.get(option.value);
      if(stat?.status==='done')option.textContent=`${base} — ${stat.sellableCount} (${money(stat.totalBuyer)} / ${money(stat.totalSeller)})`;
      else if(stat?.progressText)option.textContent=`${base} — ${stat.progressText}`;
      else option.textContent=base;
    }
    if($('check-inventories'))buttonLabel('check-inventories',state.checkingInventories?'Stop check':'Check values',state.checkingInventories?'stop':'sell');
    renderPageCheckButton(subText);
    syncSteamPageInventories();
    syncPickers();
  }
  function computeGroupsTotals(ctx,groups){
    const sellableCount=groups.reduce((s,g)=>s+g.available,0),typeCount=groups.length;
    let totalBuyer=0,totalSeller=0,unpriced=0;
    const min=Number(ctx.wallet.wallet_market_minimum||1),inc=Number(ctx.wallet.wallet_currency_increment||1);
    for(const g of groups){
      if(g.referencePrice==null)continue;
      try{
        const q=C.quote(g.referencePrice,S.feeFunction(ctx,g),min,inc);
        totalBuyer+=q.buyer*g.available;totalSeller+=q.seller*g.available;
      }catch{unpriced++;}
    }
    return {sellableCount,typeCount,totalBuyer,totalSeller,unpriced};
  }
  function recordInventoryStatFromGroups(ctx,invValue,groups,{unavailable=0,status='done',suffix=''}={}){
    const [appid,contextid]=invValue.split('/');
    const totals=computeGroupsTotals(ctx,groups);
    const progressText=status==='done'?'':`${totals.sellableCount} (${money(totals.totalBuyer)} / ${money(totals.totalSeller)}${suffix?` · ${suffix}`:''})`;
    state.inventoryStats.set(invValue,{appid,contextid,status,suffix,progressText,sellableCount:totals.sellableCount,typeCount:totals.typeCount,totalBuyer:totals.totalBuyer,totalSeller:totals.totalSeller,unavailable:unavailable+totals.unpriced,checked:Date.now()});
    syncInventoryViews();
  }
  async function checkInventories(){
    if(state.checkingInventories){state.stopInventoryCheck=true;note('Stopping inventory check…');renderPageCheckButton('Stopping…');return;}
    if(state.busy)return;
    discoverInventories();
    let ctx;
    try{ctx=refreshContext();}catch(error){note(error.message,'error');renderPageCheckButton(error.message);return;}
    const orderedVals=[...$('inventory').options].map(o=>o.value);
    if(!orderedVals.length)return;
    state.checkingInventories=true;state.stopInventoryCheck=false;lockUi(true);
    client.shouldStop=()=>state.stopInventoryCheck;
    client.onWait=(waitMs)=>{
      const secs=Math.ceil(waitMs/1000);
      const waitMsg=`Steam rate limit — resuming in ${secs}s…`;
      note(waitMsg);renderPageCheckButton(waitMsg);
    };
    try{
      // Phase 1: Load all inventory item lists first so every game immediately shows its sellable count.
      const loadedList=[];
      for(let idx=0;idx<orderedVals.length;idx++){
        if(state.stopInventoryCheck)break;
        const invValue=orderedVals[idx],[appid,contextid]=invValue.split('/');
        const label=gameName(appid);
        const statusMsg=`Reading ${label} inventory (${idx+1}/${orderedVals.length})…`;
        state.inventoryStats.set(invValue,{appid,contextid,status:'loading',progressText:'Reading…'});
        note(statusMsg);loading(idx,orderedVals.length,statusMsg);syncInventoryViews(statusMsg);
        let groups;
        const cachedInv=state.inventoryCache.get(invValue);
        if(state.tab==='sell'&&!state.dirty&&$('inventory').value===invValue&&state.rows.length)groups=state.rows;
        else if(cachedInv&&Date.now()-cachedInv.checked<180000)groups=cachedInv.groups;
        else{
          try{
            groups=await client.inventory(ctx,appid,contextid,n=>{
              const msg=`Reading ${label}… ${n} items`;
              state.inventoryStats.set(invValue,{appid,contextid,status:'loading',progressText:`Reading (${n})…`});
              note(msg);syncInventoryViews(msg);
            });
            state.inventoryCache.set(invValue,{groups,checked:Date.now()});
          }catch(error){
            state.inventoryStats.set(invValue,{appid,contextid,status:'error',progressText:'Unavailable',title:error.message});
            syncInventoryViews();continue;
          }
        }
        for(const item of groups){
          const cachedPrice=typeof client.peekLowest==='function'?client.peekLowest(ctx,item):null;
          if(cachedPrice)item.referencePrice=cachedPrice.price;
        }
        if(!groups.length||groups.every(g=>g.referencePrice!=null)){
          recordInventoryStatFromGroups(ctx,invValue,groups);
        }else{
          recordInventoryStatFromGroups(ctx,invValue,groups,{status:'loading',suffix:`0/${groups.length}`});
          loadedList.push({invValue,appid,contextid,label,groups});
        }
      }
      // Phase 2: Fetch prices for all marketable item types across all remaining inventories.
      for(let idx=0;idx<loadedList.length;idx++){
        if(state.stopInventoryCheck)break;
        const {invValue,label,groups}=loadedList[idx];
        let unavailable=0;
        for(let i=0;i<groups.length;i++){
          if(state.stopInventoryCheck)break;
          const item=groups[i];
          const cachedPrice=typeof client.peekLowest==='function'?client.peekLowest(ctx,item):null;
          if(cachedPrice){
            item.referencePrice=cachedPrice.price;
            recordInventoryStatFromGroups(ctx,invValue,groups,{unavailable,status:'loading',suffix:`${i+1}/${groups.length}`});
            continue;
          }
          const stepMsg=`${label}: checking ${i+1}/${groups.length} (${item.name})`;
          recordInventoryStatFromGroups(ctx,invValue,groups,{unavailable,status:'loading',suffix:`${i}/${groups.length}`});
          loading(i,groups.length,`${label} ${i}/${groups.length}`);note(stepMsg);renderPageCheckButton(`${label}: ${i+1}/${groups.length}`);
          try{
            const quote=await client.lowest(ctx,item);
            item.referencePrice=quote.price;
          }catch(error){
            item.referencePrice=null;unavailable++;
          }
          recordInventoryStatFromGroups(ctx,invValue,groups,{unavailable,status:'loading',suffix:`${i+1}/${groups.length}`});
          loading(i+1,groups.length,`${label} ${i+1}/${groups.length}`);
          if(state.tab==='sell'&&$('inventory').value===invValue&&state.rows===groups)renderRows();
        }
        if(state.stopInventoryCheck){
          recordInventoryStatFromGroups(ctx,invValue,groups,{unavailable,status:'done'});
          break;
        }
        client.touchPrices?.(ctx,groups);
        recordInventoryStatFromGroups(ctx,invValue,groups,{unavailable,status:'done'});
        if(state.tab==='sell'&&$('inventory').value===invValue&&state.rows===groups)renderRows();
      }
      const done=[...state.inventoryStats.values()].filter(s=>s.status==='done');
      if(done.length){
        const items=done.reduce((a,s)=>a+s.sellableCount,0),buyer=done.reduce((a,s)=>a+s.totalBuyer,0),seller=done.reduce((a,s)=>a+s.totalSeller,0);
        note(`${state.stopInventoryCheck?'Check stopped.':'All inventories checked.'} ${items} sellable items · With fees: ${money(buyer)} · Without fees: ${money(seller)}.`,'good');
      }
    }finally{
      client.onWait=null;client.shouldStop=null;
      state.checkingInventories=false;state.stopInventoryCheck=false;
      $('load-progress-wrap').hidden=true;lockUi(false);syncInventoryViews();
    }
  }
  async function loadSortPrices(ctx) {
    let unavailable=0,interrupted='';
    client.onWait=(waitMs)=>{note(`Steam rate limit — resuming in ${Math.ceil(waitMs/1000)}s…`);};
    try{
      for(let i=0;i<state.rows.length;i++){
        const item=state.rows[i];
        const cached=typeof client.peekLowest==='function'?client.peekLowest(ctx,item):null;
        if(cached){item.referencePrice=cached.price;continue;}
        loading(i,state.rows.length,`Checking prices ${i}/${state.rows.length}`);
        note(`Checking lowest sell listing ${i+1}/${state.rows.length}: ${item.name}`);
        try{const quote=await client.lowest(ctx,item);item.referencePrice=quote.price;}
        catch(error){item.referencePrice=null;unavailable++;}
        loading(i+1,state.rows.length,`Checking prices ${i+1}/${state.rows.length}`);
        renderRows();
      }
      client.touchPrices?.(ctx,state.rows);
      if(state.tab==='sell')recordInventoryStatFromGroups(ctx,$('inventory').value,state.rows,{unavailable});
    }finally{client.onWait=null;}
    return {unavailable,interrupted};
  }
  async function changeSort(value) {
    if(state.busy)return;
    const previous=state.sort;let report=null;
    state.sort=value;$('sort').value=value;$('preview-sort').value=value;state.page=0;state.previewPage=0;syncPickers();
    if(state.stage==='select'&&state.tab==='sell'&&value!=='name'){
      lockUi(true);renderRows();note('Sorting by Steam lowest sell price…');
      try{
        report=await loadSortPrices(refreshContext());
      }catch(error){state.sort=previous;$('sort').value=previous;$('preview-sort').value=previous;syncPickers();renderRows();note(error.message,'error');return;}
      finally{$('load-progress-wrap').hidden=true;lockUi(false);}
    }
    if(state.stage==='preview')renderPreview();else renderRows();
    if(value==='name'){note('Sorted by item name.');return;}
    const rows=state.stage==='preview'?state.preview.lines:state.rows;
    const prices=rows.map(r=>state.stage==='preview'||state.tab==='cancel'?r.buyer:r.referencePrice).filter(p=>p!==null&&p!==undefined);
    const same=prices.length===rows.length&&prices.length>1&&prices.every(p=>p===prices[0]);
    note(report?.interrupted?`Sorted available prices; unpriced items are last. ${report.interrupted}`:report?.unavailable?`Sorted by price. ${report.unavailable} item type(s) have no available price and appear last.`:same?'All items have the same price; their order is unchanged.':`Sorted by price: ${value==='asc'?'low to high':'high to low'}.`,report?.interrupted?'error':'');
  }
  function lockUi(value) {
    state.busy = value;
    for (const id of ['sell-tab','cancel-tab','relist-tab','load','sell-all','load-listings','inventory','mode','amount','search','select','clear','prepare','prev','next','discard','commit','back-items','sort','preview-sort','refresh-prices']) $(id).disabled = value;
    if ($('check-inventories')) $('check-inventories').disabled = value && !state.checkingInventories;
    if ($('check-inventories-page')) $('check-inventories-page').disabled = value && !state.checkingInventories;
    $('close').disabled = queue.running;
    for (const control of $('rows').querySelectorAll('input')) control.disabled = value;
    syncPickers();
    if (!value) { $('commit').disabled=state.previewNeedsRefresh; $('prepare').disabled = !state.selected.size || state.dirty; pageSlice(filtered(),'page','pageSize','page-info','prev','next'); }
  }
  function selectedCount() { return [...state.selected.values()].reduce((a, b) => a + b, 0); }
  function renderRows() {
    const list = filtered(); $('rows').replaceChildren();
    $('items-table').dataset.kind = state.tab === 'sell' ? 'sell' : 'cancel';
    header($('thead'), state.tab === 'sell' ? ['Select','Item','Available','Quantity','Lowest listing'] : ['Select','Item','Qty','Sell price (after fees)']);
    const visible = pageSlice(list,'page','pageSize','page-info','prev','next');
    for (const item of visible) {
      const tr = document.createElement('tr');
      tr.dataset.selected = String(state.selected.has(item.key));
      const box = document.createElement('input'); box.type = 'checkbox'; box.checked = state.selected.has(item.key); box.disabled = state.busy;
      box.setAttribute('aria-label', `Select ${item.name}`);
      cell(tr, '').append(box); itemCell(tr, item);
      box.addEventListener('change', () => { invalidate(); if (box.checked) state.selected.set(item.key, state.tab === 'sell' ? item.available : 1); else state.selected.delete(item.key); renderRows(); });
      if (state.tab === 'sell') {
        cell(tr, String(item.available), 'num');
        const qty = document.createElement('input'); qty.type = 'number'; qty.min = '1'; qty.max = String(item.available); qty.step = '1'; qty.value = String(state.selected.get(item.key) || item.available); qty.disabled = state.busy;
        qty.setAttribute('aria-label', `Quantity of ${item.name}`); cell(tr, '', 'num').append(qty);
        cell(tr,item.referencePrice==null?'—':money(item.referencePrice),'num');
        qty.addEventListener('change', () => { invalidate(); const n = Number(qty.value); if (!Number.isSafeInteger(n) || n < 1 || n > item.available) { note('Enter a quantity between 1 and the number available.', 'error'); qty.value = String(state.selected.get(item.key) || item.available); return; } state.selected.set(item.key, n); renderRows(); });
      } else { cell(tr,'1','num');priceCell(tr,item); }
      $('rows').append(tr);
    }
    $('empty').hidden = list.length > 0; $('empty').textContent = state.rows.length ? 'No items match this filter.' : 'Nothing loaded. Use the load button above.';
    const selling = state.tab === 'sell', count = selectedCount();
    $('selection').textContent = `${count} ${selling ? 'items' : 'listings'} selected · all pages`;
    $('select').textContent = `Select ${$('search').value ? 'all matches' : selling ? 'all types' : 'all listings'} (${list.length})`;
    buttonLabel('select',$('select').textContent,'select');$('select').title = 'Select every matching entry across all pages.';
    $('count').textContent = selling ? `Total selected: ${count} items across ${state.selected.size} types` : `Total selected: ${count} listings across all pages`;
    const pageUnits = visible.reduce((sum,item) => sum + (selling ? item.available : 1),0);
    $('page-detail').textContent = selling ? `This page: ${pageUnits} items in ${visible.length} types · ${state.rows.length} types loaded` : `This page: ${visible.length} listings · ${state.rows.length} loaded`;
    $('prepare').disabled = state.busy || !state.selected.size || state.dirty;syncPickers();scheduleLayout();
  }
  function switchTab(tab) {
    if (state.busy) return;
    state.tab = tab; state.rows = []; state.selected.clear(); state.dirty = false; state.page = 0; state.sort='name';$('sort').value='name';$('preview-sort').value='name'; invalidate();
    $('search').value = ''; $('inventory-controls').hidden = tab !== 'sell'; $('price-controls').hidden = tab === 'cancel'; $('listing-controls').hidden = tab === 'sell';
    for (const action of ['sell','cancel','relist']) $(action + '-tab').setAttribute('aria-pressed', String(tab === action));
    buttonLabel('prepare',tab === 'sell' ? 'Review selected items' : tab === 'relist' ? 'Review relisting' : 'Review cancellations','review'); renderRows();
    note(tab === 'relist' ? 'Load active listings, select items, then review their new prices.' : 'Load items or active listings to begin.');
  }
  function refreshContext() {
    state.context = S.context({ requireWallet:state.tab !== 'cancel' }); $('currency').textContent = state.context.code ? `${state.context.code} wallet` : 'Steam wallet';
    return state.context;
  }
  async function load() {
    if (state.busy) return;
    invalidate(); state.selected.clear(); state.rows = []; state.dirty = true; lockUi(true); renderRows();
    try {
      loading(0,0,'Loading…');
      const ctx = refreshContext();
      if (state.tab === 'sell') {
        const invValue = $('inventory').value, [appid, contextid] = invValue.split('/');
        state.rows = await client.inventory(ctx, appid, contextid, n => note(`Loading inventory… ${n} items read`));
        state.inventoryCache.set(invValue, { groups: state.rows, checked: Date.now() });
        for (const item of state.rows) {
          const cached = typeof client.peekLowest === 'function' ? client.peekLowest(ctx, item) : null;
          if (cached) item.referencePrice = cached.price;
        }
        if (state.sort !== 'name') await loadSortPrices(ctx);
        else if (!state.rows.length || state.rows.every(r => r.referencePrice != null)) recordInventoryStatFromGroups(ctx, invValue, state.rows);
      } else state.rows = await client.listings(n => note(`Loading active sell listings… ${n} read`));
      state.dirty = false; state.page = 0; note(state.rows.length ? 'Choose items for this batch.' : 'No marketable items or active sell listings found.');
    } catch (error) { note(error.message, 'error'); }
    finally { $('load-progress-wrap').hidden=true;lockUi(false); renderRows(); }
  }
  async function prepare({refresh=false}={}) {
    if (state.busy || state.dirty || !state.selected.size) return;
    const previous=state.preview,previousPage=state.previewPage;
    if(refresh&&(!previous||previous.tab==='cancel'||state.stage!=='preview'))return;
    if(refresh)state.previewNeedsRefresh=true;else invalidate();
    lockUi(true);
    try {
      const ctx = refreshContext(), mode = refresh?previous.pricing.mode:$('mode').value;
      if(refresh&&(ctx.steamid!==previous.steamid||ctx.currency!==previous.currency))throw new Error('Steam account or currency changed. Reload your inventory before continuing.');
      const amount = refresh?previous.pricing.amount:mode === 'match' ? 0 : C.parseInput($('amount').value);
      if (mode === 'fixed' && !amount) throw new Error('A fixed price must be greater than zero.');
      const chosen = ordered(state.rows.filter(r => state.selected.has(r.key)),r=>state.tab==='sell'?r.referencePrice:r.buyer); const lines = [], jobs = [];
      // Validate the entire relist selection before preparing any destructive action.
      if (state.tab === 'relist') for (const item of chosen) client.validateRelist(item);
      let totalBuyer = 0, totalSeller = 0, checked = Date.now(), fetchedAny = false;
      const batchPrices = new Map();
      for (let i = 0; i < chosen.length; i++) {
        const item = chosen[i];
        if (state.tab === 'cancel') { lines.push({ ...item,quantity:1 }); jobs.push({ id:item.id, name:item.name,appid:item.appid, image:item.image,buyer:item.buyer, status:'queued' }); continue; }
        const quantity = state.selected.get(item.key);
        let lowest = null, target = amount;
        if (mode !== 'fixed') {
          const priceKey = client.priceKey(ctx, item);
          const cached = batchPrices.get(priceKey) || (!refresh && typeof client.peekLowest === 'function' ? client.peekLowest(ctx, item) : null);
          if (!cached) {
            fetchedAny = true;
            loading(i,chosen.length,`Checking prices ${i}/${chosen.length}`);
            note(`Checking lowest sell listing ${i + 1}/${chosen.length}: ${item.name}`);
          }
          const price = cached || await client.lowest(ctx, item, refresh);
          batchPrices.set(priceKey, price);
          lowest = price.price; item.referencePrice = lowest; checked = Math.min(checked, price.checked); target = lowest - amount;
          if (!cached) loading(i+1,chosen.length,`Checking prices ${i+1}/${chosen.length}`);
        }
        const quote = C.quote(target, S.feeFunction(ctx, item), Number(ctx.wallet.wallet_market_minimum || 1), Number(ctx.wallet.wallet_currency_increment || 1));
        lines.push({ name:item.name,appid:item.appid, image:item.image, nameColor:item.nameColor, quantity, lowest, oldBuyer:item.buyer, ...quote });
        totalBuyer += quote.buyer * quantity; totalSeller += quote.seller * quantity;
        if (!Number.isSafeInteger(totalBuyer) || !Number.isSafeInteger(totalSeller)) throw new Error('Batch total is too large.');
        if (state.tab === 'relist') jobs.push({ ...item, ...quote, status:'queued' });
        else jobs.push(...C.allocate(item, quantity).map(job => ({ ...job, image:item.image, nameColor:item.nameColor, ...quote, status:'queued' })));
      }
      if (fetchedAny && state.tab === 'sell') {
        client.touchPrices?.(ctx, chosen);
        if (state.rows.length && state.rows.every(r => r.referencePrice != null)) recordInventoryStatFromGroups(ctx, $('inventory').value, state.rows);
      }
      // Freeze the approved plan; subsequent UI changes cannot alter queued prices.
      state.preview = Object.freeze({ tab:state.tab, steamid:ctx.steamid, currency:ctx.currency, checked, prepared:Date.now(), pricing:Object.freeze({mode,amount}), lines, jobs, totalBuyer, totalSeller, count:selectedCount() });
      state.previewNeedsRefresh=false;state.previewPage = refresh?previousPage:0; renderPreview(); note(refresh?(mode==='fixed'?'Review refreshed. Your fixed buyer price is unchanged; review the amounts before listing.':'Prices refreshed. Review the updated amounts before listing.'):'Review the quantities and amounts below. No changes have been sent to Steam.', 'good');
    } catch (error) { if(!refresh)invalidate(); note(refresh?`Refresh failed: ${error.message} Try Refresh prices again.`:error.message, 'error'); }
    finally { $('load-progress-wrap').hidden=true;lockUi(false); }
  }
  function renderPreview() {
    const p = state.preview; if (!p) return;
    showStage('preview'); $('preview-rows').replaceChildren();
    const selling = p.tab !== 'cancel', relisting = p.tab === 'relist';
    $('refresh-prices').hidden=!selling;
    buttonLabel('refresh-prices',p.pricing.mode==='fixed'?'Refresh review':'Refresh prices','refresh');
    $('refresh-prices').title=p.pricing.mode==='fixed'?'Recheck fees and renew this fixed-price review.':'Fetch fresh lowest sell prices for these items and update this review.';
    $('preview-title').textContent = relisting ? 'Review relisting' : selling ? 'Review sale batch' : 'Review listing cancellations';
    $('preview-table-wrap').querySelector('table').dataset.kind=selling ? 'sell' : 'cancel';
    header($('preview-head'), selling ? ['Item','Qty',relisting ? 'Current buyer price' : 'Lowest listing','Buyer pays / item','You receive / item'] : ['Item','Qty','Sell price (after fees)']);
    for (const line of pageSlice(ordered(p.lines,r=>r.buyer),'previewPage','previewSize','preview-page-info','preview-prev','preview-next')) {
      const tr = document.createElement('tr'); itemCell(tr, line);
      if (selling) { cell(tr, String(line.quantity), 'num'); cell(tr, relisting ? (line.oldBuyer == null ? '—' : money(line.oldBuyer)) : line.lowest === null ? 'Fixed price' : money(line.lowest), 'num'); cell(tr, money(line.buyer), 'num'); cell(tr, money(line.seller), 'num'); }
      else {cell(tr,'1','num');priceCell(tr,line);} $('preview-rows').append(tr);
    }
    $('preview-hint').textContent= relisting ? 'Each listing will be cancelled, then the returned item listed at the reviewed price. Steam confirmations or restrictions may apply; an item that cannot be relisted stays in your inventory.' : selling?'Steam confirmations may be required. These prices stay fixed for this batch.':'Prices are per listing. Amounts in parentheses are your proceeds after Steam fees.';
    $('totals').replaceChildren(); $('totals').style.gridTemplateColumns = selling ? '' : '1fr 1fr';
    const stats = selling ? [['Selected',`${p.count} items`],['Buyer pays',money(p.totalBuyer)],['You receive',money(p.totalSeller),'net'],['Steam fees',money(p.totalBuyer - p.totalSeller)]] : [['Selected',`${p.count} listings`],['Action','Cancel listings']];
    for (const [label,value,cls=''] of stats) { const stat=document.createElement('div'); stat.className=`summary-stat ${cls}`; const l=document.createElement('div');l.className='summary-label';l.textContent=label;const v=document.createElement('div');v.className='summary-value';v.textContent=value;stat.append(l,v);$('totals').append(stat); }
    $('session-note').textContent = selling ? `Prices checked ${new Date(p.checked).toLocaleTimeString()}` : 'Completed sales cannot be cancelled.';
    $('commit').textContent = relisting ? `Relist ${p.count} ${p.count === 1 ? 'item' : 'items'}` : selling ? `List ${p.count} items` : `Cancel ${p.count} listings`;
    $('commit').disabled=state.busy||state.previewNeedsRefresh;
    $('commit').className = selling ? 'primary' : 'danger';buttonLabel('commit',$('commit').textContent,selling?'sell':'cancel');syncPickers();scheduleLayout();
  }
  function saveJournal(job, kind) {
    // No credentials or session tokens are persisted. This is a crash/reload warning only.
    try {
      const stored = JSON.parse(sessionStorage.getItem(journalKey) || '[]');
      const entries = Array.isArray(stored) ? stored : [stored];
      const id = job.id || job.assetid;
      const entry = { at:Date.now(), kind, name:job.name, id, phase:job.phase, cancelled:job.cancelled, sellAttempted:job.sellAttempted, returnedAssetid:job.returnedAssetid, appid:job.appid, contextid:job.contextid, seller:job.seller };
      const index = entries.findIndex(e => e.id === id && e.kind === kind);
      if (index < 0) entries.push(entry); else entries[index] = entry;
      sessionStorage.setItem(journalKey, JSON.stringify(entries));
    } catch {}
  }
  function settleJournal(job, kind) {
    try {
      const stored = JSON.parse(sessionStorage.getItem(journalKey) || '[]');
      const entries = (Array.isArray(stored) ? stored : [stored]).filter(e => e.id !== (job.id || job.assetid) || e.kind !== kind);
      if (entries.length) sessionStorage.setItem(journalKey, JSON.stringify(entries)); else sessionStorage.removeItem(journalKey);
    } catch {}
  }
  function renderProgress() {
    if (!state.jobs.length) return;
    showStage('progress'); $('jobs').replaceChildren();
    const done = state.jobs.filter(j => j.status === 'done' || j.status === 'confirmation').length;
    const errors = state.jobs.filter(j => j.status === 'failed' || j.status === 'unknown').length;
    const totalUnits=state.jobs.reduce((sum,j)=>sum+(j.amount||1),0),processedUnits=state.jobs.filter(j=>['done','confirmation','failed','unknown'].includes(j.status)).reduce((sum,j)=>sum+(j.amount||1),0);
    $('batch-progress').max=totalUnits;$('batch-progress').value=processedUnits;
    $('batch-progress-text').textContent=`${processedUnits}/${totalUnits} ${state.tab==='sell'?'items':'listings'} processed · ${Math.floor(processedUnits/totalUnits*100)}%`;
    $('progress-title').textContent = `${queue.running ? queue.paused ? 'Paused' : 'Running' : 'Batch ended'} · ${done}/${state.jobs.length} requests completed${errors ? ` · ${errors} need attention` : ''}`;
    if (state.followJobs) {
      let index = state.jobs.findIndex(j=>j.status === 'working');
      if (index < 0 && (queue.paused || !queue.running)) index = state.jobs.findIndex(j=>j.status === 'failed' || j.status === 'unknown');
      if (index < 0) index = Math.max(0,state.jobs.findIndex(j=>j.status === 'queued') - 1);
      state.jobPage = Math.floor(index / state.jobSize);
    }
    for (const job of pageSlice(state.jobs,'jobPage','jobSize','job-page-info','job-prev','job-next')) {
      const row = document.createElement('div'); row.className = 'job'; row.dataset.status = job.status;
      row.append(itemContent(job));
      for (const text of [job.status === 'working' && job.phase ? job.phase : jobLabels[job.status] || job.status, job.message || (job.amount ? `Quantity ${job.amount}` : '')]) { const span = document.createElement('span'); span.textContent = text; span.title = text; row.append(span); }
      $('jobs').append(row);
    }
    const retryInventory = queue.paused && state.jobs.some(j => j.status === 'failed' && j.retryable);
    $('pause').textContent = queue.paused ? retryInventory ? 'Retry inventory check' : 'Continue remaining' : 'Pause'; $('pause').disabled = !queue.running || queue.stopped; $('stop').disabled = !queue.running || queue.stopped;
    $('close').disabled = queue.running;
    $('back-items').disabled = queue.running;
    const uncertain = state.jobs.find(j => j.status === 'unknown');
    buttonLabel('pause',$('pause').textContent,queue.paused?'play':'pause');scheduleLayout();
    if (queue.paused && errors) note(retryInventory ? 'Inventory check paused. Retry to resume this item; its listing will not be cancelled again.' : uncertain ? 'A response was lost or unclear. Check Steam before continuing. That request will not be repeated.' : 'A request failed. Read the step and error below; you can continue the remaining requests or stop.', 'error');
  }
  async function commit() {
    const p = state.preview; if (!p || state.busy || state.previewNeedsRefresh) return;
    try {
      const current = S.context({ requireWallet:p.tab !== 'cancel' });
      if (current.steamid !== p.steamid || (p.tab !== 'cancel' && current.currency !== p.currency)) throw new Error('Steam account or currency changed. Reload before continuing.');
      S.session();
      if (Date.now() - p.prepared > 120000) {if(p.tab!=='cancel'){state.previewNeedsRefresh=true;$('commit').disabled=true;}throw new Error(p.tab!=='cancel'?`This preview is over two minutes old. Click ${p.pricing.mode==='fixed'?'Refresh review':'Refresh prices'} to update this review.`:'This review is over two minutes old. Reload active listings and review them again.');}
      const run = async () => {
        state.jobs = ordered(p.jobs,r=>r.buyer).map(j => ({ ...j })); state.followJobs = true; state.jobPage = 0; state.dirty = true; invalidate(); lockUi(true);
        const execute = async job => {
          const checkAccount = () => {
            const live = S.context({ requireWallet:p.tab !== 'cancel' });
            if (live.steamid !== p.steamid || (p.tab !== 'cancel' && live.currency !== p.currency)) throw new Error('Steam account or currency changed. Stop and reload.');
          };
          checkAccount();
          saveJournal(job, p.tab);
          try {
            const result = await (p.tab === 'sell' ? client.sell(job) : p.tab === 'relist' ? client.relist(current, job, {
              checkpoint:async () => { await queue.gate(); if (queue.stopped) throw new Error('Batch stopped.'); checkAccount(); },
              update:() => { saveJournal(job, p.tab); renderProgress(); },
              onWait:(waitMs, attempt, step) => {
                job.message = `${step} temporarily unavailable. Retrying in ${Math.ceil(waitMs / 1000)}s (attempt ${attempt}).`;
                renderProgress(); note(job.message);
              }
            }) : client.cancel(job));
            settleJournal(job, p.tab); return result;
          } catch (error) { if (!error.uncertain && !job.cancelled) settleJournal(job, p.tab); throw error; }
        };
        note(p.tab === 'relist' ? 'Relisting your selected items…' : p.tab === 'sell' ? 'Listing your approved items…' : 'Cancelling your selected listings…');
        $('session-note').textContent = p.tab === 'relist' ? 'Cancel, wait for return, then list at the approved price.' : p.tab === 'sell' ? 'Submitting approved prices.' : 'Cancelling one listing at a time.';
        try { await queue.run(state.jobs, execute, { delay:p.tab === 'cancel' ? 0 : 1500 }); }
        finally { lockUi(false); state.selected.clear(); renderRows(); renderProgress(); }
        const incomplete = state.jobs.filter(j => j.cancelled && !j.relisted).length;
        const attention = p.tab === 'relist' && state.jobs.filter(j => j.status === 'failed' || j.status === 'unknown').length;
        note(attention ? `Batch ended. ${attention} relisting request(s) need attention${incomplete ? `; ${incomplete} original listing(s) were cancelled` : ''}. Read the errors and check inventory, active listings and confirmations before retrying.` : 'Batch ended. Reload items or listings before starting another batch. Pending listings may require Steam confirmation.', attention ? 'error' : '');
      };
      if (!navigator.locks?.request) throw new Error('This browser cannot safely lock a bulk batch. Use a current Chromium build.');
      await navigator.locks.request('clean-steam-market-batch', { ifAvailable:true }, async lock => { if (!lock) throw new Error('Another Steameer batch is running in a different tab.'); await run(); });
    } catch (error) { note(error.message, 'error'); }
  }
  $('open').addEventListener('click', () => {
    if (!$('dialog').open) $('dialog').showModal();scheduleLayout();
    const active = globalThis.g_ActiveInventory;
    if (!state.rows.length && !state.busy && active && [...$('inventory').options].some(o => o.value === `${active.appid}/${active.contextid}`)) $('inventory').value = `${active.appid}/${active.contextid}`;
    try { refreshContext(); } catch (error) { note(error.message, 'error'); }
    try {
      const stored = JSON.parse(sessionStorage.getItem(journalKey) || '[]');
      const entries = Array.isArray(stored) ? stored : stored ? [stored] : [];
      if (entries.length) note(`${entries.length} earlier request(s) may have reached Steam: ${entries.slice(0, 3).map(e => e.name).join(', ')}. Check inventory, listings and confirmations before repeating them.`, 'error');
    } catch {}
  });
  $('close').addEventListener('click', () => { if (!queue.running) $('dialog').close(); });
  $('dialog').addEventListener('cancel', event => { if (queue.running) event.preventDefault(); });
  $('sell-tab').addEventListener('click', () => switchTab('sell')); $('cancel-tab').addEventListener('click', () => switchTab('cancel'));
  $('relist-tab').addEventListener('click', () => switchTab('relist'));
  $('load').addEventListener('click', load); $('load-listings').addEventListener('click', load); $('prepare').addEventListener('click', prepare); $('commit').addEventListener('click', commit);
  $('sell-all').addEventListener('click', async () => {
    if (state.busy || state.tab !== 'sell') return;
    $('search').value = ''; await load();
    if (state.dirty || !state.rows.length) return;
    for (const item of state.rows) state.selected.set(item.key, item.available);
    renderRows(); await prepare();
  });
  $('discard').addEventListener('click', invalidate);
  $('refresh-prices').addEventListener('click',()=>prepare({refresh:true}));
  $('inventory').addEventListener('change', () => { state.rows = []; state.selected.clear(); state.dirty = false; invalidate(); renderRows(); note('Load this inventory to continue.'); });
  $('mode').addEventListener('change', () => { invalidate(); $('amount-label').hidden = $('mode').value === 'match'; $('amount-text').textContent = $('mode').value === 'fixed' ? 'Buyer pays' : 'By'; });
  $('amount').addEventListener('input', invalidate);
  $('sort').addEventListener('change',()=>changeSort($('sort').value));
  $('preview-sort').addEventListener('change',()=>changeSort($('preview-sort').value));
  $('search').addEventListener('input', () => { state.page = 0; renderRows(); });
  $('select').addEventListener('click', () => { invalidate(); for (const r of filtered()) state.selected.set(r.key, state.tab === 'sell' ? r.available : 1); renderRows(); });
  $('clear').addEventListener('click', () => { state.selected.clear(); invalidate(); renderRows(); });
  $('prev').addEventListener('click', () => { state.page--; renderRows(); });
  $('next').addEventListener('click', () => { state.page++; renderRows(); });
  $('preview-prev').addEventListener('click', () => { state.previewPage--; renderPreview(); });
  $('preview-next').addEventListener('click', () => { state.previewPage++; renderPreview(); });
  $('job-prev').addEventListener('click', () => { state.followJobs=false; state.jobPage--; renderProgress(); });
  $('job-next').addEventListener('click', () => { state.followJobs=false; state.jobPage++; renderProgress(); });
  $('back-items').addEventListener('click', () => { if (!queue.running) { invalidate(); renderRows(); note('Reload your inventory or listings before starting another batch.'); } });
  $('pause').addEventListener('click', () => { if (queue.paused) queue.resume(); else queue.pause(); });
  $('stop').addEventListener('click', () => queue.stop());
  $('export').addEventListener('click', () => {
    if (reportUrl) URL.revokeObjectURL(reportUrl);
    reportUrl = URL.createObjectURL(new Blob([JSON.stringify({ exported:new Date().toISOString(), jobs:state.jobs }, null, 2)], { type:'application/json' }));
    const a = document.createElement('a'); a.href = reportUrl; a.download = `clean-market-batch-${Date.now()}.json`; a.click();
  });
  window.addEventListener('beforeunload', event => { if (queue.running) { event.preventDefault(); event.returnValue = ''; } });
  // Size every stage to its visible rows, including short final pages.
  function scheduleLayout(){if(typeof requestAnimationFrame!=='function'||layoutFrame!==null)return;layoutFrame=requestAnimationFrame(()=>{layoutFrame=null;fitLayout();});}
  function fitLayout(){
    const dialog=$('dialog');if(!dialog.open)return;
    const stage=state.stage,target=$(stage==='select'?'data-table':stage==='preview'?'preview-table-wrap':'jobs');
    const height=target.clientHeight;if(!height)return;
    const rowHeight=parseFloat(getComputedStyle(dialog).getPropertyValue('--row-size'))||64;
    const maxHeight=Math.min(820,window.innerHeight-(window.innerHeight<=650?20:window.innerWidth<=560?24:56));
    const chrome=dialog.getBoundingClientRect().height-height,header=stage==='progress'?0:32;
    const size=Math.max(1,Math.min(15,Math.floor((maxHeight-chrome-header)/rowHeight)));
    const sizeKey=stage==='select'?'pageSize':stage==='preview'?'previewSize':'jobSize';
    if(state[sizeKey]!==size){state[sizeKey]=size;if(stage==='select')renderRows();else if(stage==='preview')renderPreview();else renderProgress();}
    const count=stage==='select'?$('rows').children.length:stage==='preview'?$('preview-rows').children.length:$('jobs').children.length;
    const wanted=Math.min(maxHeight,Math.ceil(chrome+header+(count?count*rowHeight:96)));
    if(Math.abs(dialog.getBoundingClientRect().height-wanted)>1)dialog.style.height=`${wanted}px`;
  }
  if(typeof ResizeObserver==='function'){const observer=new ResizeObserver(scheduleLayout);for(const id of ['dialog','data-table','preview-table-wrap','jobs'])observer.observe($(id));}
  window.addEventListener('resize',()=>{closePickers();scheduleLayout();});
  $('check-inventories')?.addEventListener('click',checkInventories);
  $('check-inventories-page')?.addEventListener('click',checkInventories);
  document.addEventListener('click',e=>{if(e.target?.closest?.('.games_list_tabs, #games_list_tab_container'))setTimeout(syncSteamPageInventories,50);});
  // Populate the selector from Steam's inventory metadata and page tabs when available.
  discoverInventories();
  for(const id of ['theme','inventory','mode','sort','preview-sort'])initPicker(id);
  let savedTheme = 'default';
  try { savedTheme = localStorage.getItem(themeKey); } catch {}
  applyTheme(savedTheme);
  for(const [id,label,icon] of [['sell-tab','Sell items','sell'],['cancel-tab','Active listings','list'],['relist-tab','Relist items','refresh'],['load','Load items','refresh'],['check-inventories','Check values','sell'],['sell-all','Sell all…','sell'],['load-listings','Refresh active listings','refresh'],['prepare','Review selected items','review'],['discard','Back to items','back'],['stop','Stop batch','stop'],['export','Save batch report','download'],['back-items','Back to items','back'],['pause','Pause','pause'],['clear','Clear','clear']])buttonLabel(id,label,icon);
  $('open').replaceChildren();$('open').append(iconNode('market','launch-emblem'));
  const launchCopy=document.createElement('span');launchCopy.className='launch-copy';const launchTitle=document.createElement('strong');launchTitle.textContent='Market Manager';const launchSub=document.createElement('small');launchSub.textContent='Sell items · Manage listings';launchCopy.append(launchTitle,launchSub);$('open').append(launchCopy,iconNode('arrow','launch-arrow'));
  renderPageCheckButton();
  if (location.pathname.startsWith('/market')) switchTab('cancel'); else renderRows();
})();
