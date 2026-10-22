# Parse CSS vendors

Jupiter X Core ships a **prefixed** copy of Sabberworm PHP CSS Parser and PrestaShop RtlCss under `vendors/` so other plugins can load their own `Sabberworm\CSS` without fatal method-signature conflicts.

Runtime code uses `JupiterX_Core\Sabberworm\...` and `JupiterX_Core\PrestaShop\...`. Do not load `vendor/autoload.php` in production.

## Update the libraries

From the plugin root:

```sh
composer parse-css:update
```

Or from this directory:

```sh
composer update --no-dev
```

That installs the versions in `composer.json` / `composer.lock`, then [Strauss](https://github.com/BrianHenryIE/strauss) copies them into `vendors/` with the `JupiterX_Core\` prefix. `bin/patch-vendors.php` then applies small compatibility fixes (currently the RtlCss PHP 8.4 nullable constructor) so they survive the next upgrade.

Commit `composer.json`, `composer.lock`, and the regenerated `vendors/` tree. Do not commit `vendor/` or `bin/strauss.phar`.

## Version constraints

- **php-css-parser `^8.9`** is the newest 8.x line and still supports PHP 7.0 (the plugin’s current requirement).
- **9.x** needs PHP 7.2+, pulls `thecodingmachine/safe`, and may break RtlCss 2.0 (abandoned, last tested against parser 8.2). Jump to 9.x only after bumping the plugin PHP requirement and re-testing RTL output.

`config.platform.php` is set to `7.0.0` so Composer will not resolve a 9.x release until that platform version is raised.
