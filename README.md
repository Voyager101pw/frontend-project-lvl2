### Hexlet tests and linter status:
[![Actions Status](https://github.com/Voyager101pw/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Voyager101pw/frontend-project-lvl2/actions)
[![Node CI](https://github.com/Voyager101pw/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/Voyager101pw/frontend-project-lvl2/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/fc8b3bb5ff59053cd4c6/maintainability)](https://codeclimate.com/github/Voyager101pw/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fc8b3bb5ff59053cd4c6/test_coverage)](https://codeclimate.com/github/Voyager101pw/frontend-project-lvl2/test_coverage)
# Вычислитель отличий:

Утилита предназначена для вычисления разницы между двумя файлами формата JSON.

### Использование:

<p><a href= https://asciinema.org/a/73SsHTstV1pydhnDSfom7nFI2>Демонстрация установки и работы программы</a></p>

# Основные команды:

- Установка заисимостей
```sh
$ make install
```

- Справка
```sh
$ make start
```

- Запуск
```sh
$ make node gendiff path1=<путь/название файла> path2=<путь/название файла>
$ node bin/gendiff <путь/название файла> <путь/название файла>
```

- Вывод разницы ни примере двух плоских структур.
[![asciicast](https://asciinema.org/a/8mBYOY9h90wYD2gcE3KszB4iY.svg)](https://asciinema.org/a/8mBYOY9h90wYD2gcE3KszB4iY)
- Вывод разницы двух файлов в стиле "stylish" (по умолчанию)
[![asciicast](https://asciinema.org/a/xYYVvBiViRCF6BzjEShElxbCA.svg)](https://asciinema.org/a/xYYVvBiViRCF6BzjEShElxbCA)
- Вывод разницы двух файлов в стиле "plain"
[![asciicast](https://asciinema.org/a/d0TFsLSZbq8dgRc3FwZ8avdk8.svg)](https://asciinema.org/a/d0TFsLSZbq8dgRc3FwZ8avdk8)