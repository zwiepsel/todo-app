angular.module('todoApp', [])
    .controller('todoController', ['$scope', function ($scope) {

        var chosenDate = new Date();

        //initialiseer de datapicker op de DOM
        const dp = TinyDatePicker(document.querySelector('.datePicker', {
            format(date) {
                return date.toLocaleDateString();
            },
            hilightedDate: new Date(),
        }));

        //dummy bestand omdat we geen database gekoppeld hebben.
        $(document).ready(function () {
            var tasks = $.getJSON("assets/tasks/tasks.json", function () {
                $scope.Tasks = tasks.responseJSON;
                for (index = 0; index < $scope.Tasks.length; ++index) {
                    $scope.Tasks[index].date = new Date();
                }
                $scope.$applyAsync();
            })
        });

        $scope.Colors = [{
                id: 1,
                value: 'lightblue'
            },
            {
                id: 2,
                value: 'darkblue'
            },
            {
                id: 3,
                value: 'green'
            },
            {
                id: 4,
                value: 'yellow'
            }
        ]

        dp.on('statechange', (_, picker) => getTasks(picker.state.hilightedDate));

        //verwijder de geselecteerde task
        $scope.removeTask = function (task, index) {
            $scope.Tasks.splice(index, 1);
        }

        //voeg een nieuwe task toe
        $scope.addTask = function (task) {
            //zorg dat er een nieuw id wordt gegenereerd
            if ($scope.Tasks != null && $scope.Tasks.length > 0) {
            task.id = ($scope.Tasks[$scope.Tasks.length - 1].id) + 1
            }
            else
            {
                task.id = 1;
            }
            task.date = new Date();
            console.log($scope.Tasks)
            $scope.Tasks.push(task);
            $scope.task = null;
            
        }

        //doorhalen van een afgeronde task, ongedaan maken bij reeds doorgehaald
        $scope.strike = function (task) {
            !task.striked ? task.striked = true : task.striked = false;
        }

        //geef de task een kleur
        $scope.changeColor = function (color, taskIndex, $event) {
            //repeat in repeat dus de juiste DOM element zoeken
            if ($event.target.nodeName == "SPAN") {
                task = taskIndex;
                task.color == color.value ? task.color = 'white' : task.color = color.value;
            }
        }

        $scope.removeDoneTasks = function () {
            //verwijder de doorgestreepte taken
            if ($scope.Tasks.length > 0) {
                for (var i = $scope.Tasks.length - 1; i >= 0; i--) {
                    if ($scope.Tasks[i].striked) {
                        //verkrijg eerst de index anders worden de verkeerde items verwijderd bij iteratie
                        var index = $scope.Tasks.indexOf($scope.Tasks[i]);
                        $scope.Tasks.splice(index, 1);
                    }
                }
            }
        }

        //verkrijg de taken per dag
        function getTasks(date) {
            //set de huidige taken in localstorage
            localStorage.setItem(toDate(chosenDate), JSON.stringify($scope.Tasks))
            $scope.Tasks = [];
            $scope.$applyAsync();
            chosenDate = date;
            //verkrijg de nieuwe taken uit de localstorage per datum
            var tasksByDate = JSON.parse(localStorage.getItem(toDate(date)));
            if (tasksByDate != null)
            {
              $scope.Tasks = tasksByDate
            }
            else
            {
            $scope.Tasks = [];
            }

        }

        //helper functie om datum in string weer te geven zonder tijd
        function toDate(date) {
            var year = date.getFullYear() + "";
            var month = date.getMonth() + "";
            var day = date.getDate() + "";
            var dateFormat = year + "-" + month + "-" + day;
            return dateFormat
        }

    }]);