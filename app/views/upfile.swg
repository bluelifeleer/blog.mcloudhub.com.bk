<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript" src="/public/js/vue.js"></script>
</head>

<body>
    <div id="app">
        <input type="file" name="uploadfile" id="uploadfile" v-on:change="getFiles" />
        <p>show img:</p>
        <img src="" alt="" class="img-box" v-bind:src="src">
    </div>
</body>
<script type="text/javascript">
    const VM = new Vue({
        el: '#app',
        data: {
            src: '',
        },
        methods: {
            getFiles: function(e) {
                let _this = this;
                let fileReader = new FileReader();
                let file = e.target.files[0];
                fileReader.onload = function(e) {
                    if (fileReader.readyState == 2) {
                        _this.src = fileReader.result;
                    } else {
                        _this.src = '';
                    }
                    // console.log(e);
                    // console.log(fileReader);
                }
                fileReader.readAsDataURL(file);
                // fileReader.readAsText(file);
                // console.log(fileReader);
                // console.log(e.target.files);
                // console.log(this);
            }
        }
    })
</script>

</html>