import { defineConfig } from 'vite'
import * as path from 'path';
import sass from 'sass';

export default defineConfig({
  server: {
    port: 8080
  },
  plugins: [
    {
      name: 'sass-processor',
      transform: (code, id) => {
        if (!/\.scss$/s.test(id)) {
          return null;
        }
        return new Promise((resolve, reject) => {
          sass.render(
            {
              data: code,
              includePaths: [path.resolve(__dirname, 'src/scss')],
            },
            (err, result) => {
              if (err) reject(err);
              else resolve({
                code: result?.css.toString(),
                map: result?.map?.toString(),
              });
            }
          );
        });
      },
    }
  ]
})