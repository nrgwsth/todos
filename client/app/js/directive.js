app.directive('noteCard', function() {
  return {
    restrict: 'AE',
    replace: true,
    template: `<div class="note-card col-md-3 col-sm-4 col-xs-4 shadow-1" ng-style="{'background-color': note.color}">
          <div class="icon" ng-if="checkIconVisibility" ng-click="onclick(note, $index)">
     <i class="material-icons">check</i>
            </div>
            <div class="col-xs-12 title">
     {{ note.title }}
    </div>
  <div class="col-xs-12 value">
    {{ note.value }}
  </div>
          
        </div>`,
    link: function(scope, elem, attrs) {

      elem.bind("mouseenter", function() {
        scope.checkIconVisibility = false;
        scope.$apply(function() {
          scope.checkIconVisibility = true;
        });
      });

      elem.bind("mouseleave", function() {
        scope.$apply(function() {
          scope.checkIconVisibility = false;
        });
      });
    }
  };
});

app.directive('colorPicker', function() {
  return {
    restrict: 'AE',
    replace: true,
    template: `
    <div class="color-selector">
  <i ng-click="showSelector(true)" class="material-icons icon2">color_lens</i>
  <div class="selector row center-xs" ng-if="isSelectorVisible">
    <div
      class="color"
      ng-repeat="color in colors"
      ng-click="selectColor(color)"
      ng-style="{'background-color': color, 'float': 'left'}"
    ></div>
  </div>
</div>
`,
    link: function(scope, elem, attrs) {
      console.log(scope, attrs);
    }
  };
});