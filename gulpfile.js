import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
import { src, dest, watch, series } from 'gulp'

const sass = gulpSass(dartSass); // compilar sass con gulpsass

export function js( done ) {
    src('src/js/app.js')
        .pipe(dest('dist/js')) // hace una copia del archivo y la lleva al destino
    done()
}

export function css( done ) {
    src('src/scss/app.scss', {sourcemaps: true})
        .pipe( sass().on('error', sass.logError) )
        .pipe( dest('dist/css',  {sourcemaps: true}) ) // sabe en que archivo scss esta algun elemento
    done()
}

export function html( done ) {
    src('src/*.html')
        .pipe(dest('dist/'))
    done()
}

export function imgs() {
    return src('src/images/**/*', { encoding: false })
        .pipe(dest('dist/images'));
}

export function data() {
    return src('src/data/data.json')
        .pipe(dest('dist/data'));
}


export function dev() {
    watch('src/scss/**/*.scss', css) // habilitar modo watch para reflejar cambios inmediatamente. el ** indica que busque todos los archivos con extencion .scss
    watch('src/js/**/*.js', js) // lo mismo para javascript
    watch('src/*.html', html)
    watch('src/data/*.json', data)
}

export const build = series(data, imgs, js, css, html);

export default series( data, imgs, js, css, html, dev )