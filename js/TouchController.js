var TouchController = function() {
    this.initialize();
    this.oldMousePos = {x: 0, y:0};
}

TouchController.prototype = {
    initialize: function () {
        var _this = this;
        _this.canvas = document.querySelector('#main-canvas');
        
        _this.container = document.createElement('div');
        _this.container.className = 'info';
        _this.container.innerHTML = 'touch up';
        document.body.appendChild(_this.container);

        _this.canvas.addEventListener('touchstart', onTouchStart, false);


        function onTouchStart (event) {
            event.preventDefault();

            canvas_x = event.targetTouches[0].pageX;
            canvas_y = event.targetTouches[0].pageY;

            _this.canvas.addEventListener('touchmove', onTouchMove, false);
            _this.canvas.addEventListener('touchend', onTouchUp, false);
            _this.container.innerHTML = 'touch down';

        }

        function onTouchUp (event) {

            var el = event.target;
            document.removeEventListener('touchmove', onTouchMove, false);
            document.removeEventListener('touchup', onTouchUp, false);

            _this.container.innerHTML = 'touch up';
        }

        function onTouchMove (event) {
            var xPos = event.targetTouches[0].pageX;
            var yPos = event.targetTouches[0].pageY;

            _this.container.innerHTML = 'Y:' + yPos + ' X: ' + xPos;
            var elPos = Game.getPlayer().getCurrentPos();

            var dif = {
                x: Math.abs(_this.oldMousePos.x - xPos),
                y: Math.abs(_this.oldMousePos.y - yPos),
            };

            var pos = {}

            pos.x = elPos.y + ((_this.oldMousePos.y < yPos) ? dif.y : -(dif.y)) + 'px';
            pos.y = elPos.x + ((_this.oldMousePos.x < xPos) ? dif.x : -(dif.x)) + 'px';

            Game.getPlayer().setX(xPos)

            _this.oldMousePos.x = xPos;
            _this.oldMousePos.y = yPos;
        }
    },



    getTranslate: function (el) {
        var trans_str = el.style.transform;
        trans_arr = trans_str.replace('translate(' ,'').replace(')', '').split(', ');
        trans_arr[0] = parseInt(trans_arr[0]);
        trans_arr[1] = parseInt(trans_arr[1]);

        return {x: trans_arr[0], y: trans_arr[1]}
    },

}