### Creating a shader

- Must call `WebGLRenderingContext.createShader`, which takes the type of shader you want to create as an arg (i.e. `const shader = gl.createShader(gl.VERTEX_SHADER)`)
- Must then attach the GLSL source code to the shader using `shaderSource` (i.e. `gl.shaderSource(shader, GLSLSourceCode)`)
- Must then compile the shader (i.e. `gl.compileShader(shader)`)

### Programs

A program links two shaders together

```
const program = gl.createProgram();

// Attach shaders:
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmtShader)
```

You then need to link the program to the gl instance with `gl.linkProgram(program)`, then use the program with `gl.useProgram(program)`

#### Using the program to draw something

```
gl.useProgram(program);

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.enableVertexAtribArray(attributeLocation, 3, gl.FLOAT, false, 0, 0);

// Perform the actual drawing
gl.drawArray(gl.TRIANGLES, 0, 3);
```
