var app = angular.module("paramapp", ["xeditable","ngMaterial", "ngMessages", "ngRoute", "ngTable", "checklist-model"]);

app.directive("fileModel", [
    "$parse",
    function ($parse) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind("change", function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            },
        };
    },
]);

app.service("fileUpload", [
    "$http",
    function ($http) {
        this.uploadFileToUrl = function (file, uploadUrl) {
            var fd = new FormData();
            fd.append("file", file);
            $http
                .post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: { "Content-Type": undefined },
                })
                .then(
                    function () {
                        new PNotify({
                            title: "SM Notification",
                            type: "success",
                            text: "Importation bien effectuée",
                            nonblock: {
                                nonblock: true,
                            },
                            addclass: "success",
                            styling: "bootstrap3",
                            hide: true,
                        });

                        //$scope.notification("message envoyé avec succès","success");
                        //alert("Fichier importé");
                    },
                    function errorCallback(response) {new PNotify({
                            title: "SM Notification",
                            type: "error",
                            text: "Echec de l importation",
                            nonblock: {
                                nonblock: true,
                            },
                            addclass: "success",
                            styling: "bootstrap3",
                            hide: true,
                        });
					}
                );
        };
    },
]);
app.directive("numberInput", function ($filter) {
    return {
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            ngModelCtrl.$formatters.push(function (modelValue) {
                return setDisplayNumber(modelValue, true);
            });

            // it's best to change the displayed text using elem.val() rather than
            // ngModelCtrl.$setViewValue because the latter will re-trigger the parser
            // and not necessarily in the correct order with the changed value last.
            // see http://radify.io/blog/understanding-ngmodelcontroller-by-example-part-1/
            // for an explanation of how ngModelCtrl works.
            ngModelCtrl.$parsers.push(function (viewValue) {
                setDisplayNumber(viewValue);
                return setModelNumber(viewValue);
            });

            // occasionally the parser chain doesn't run (when the user repeatedly
            // types the same non-numeric character)
            // for these cases, clean up again half a second later using "keyup"
            // (the parser runs much sooner than keyup, so it's better UX to also do it within parser
            // to give the feeling that the comma is added as they type)
            elem.bind("keyup focus", function () {
                setDisplayNumber(elem.val());
            });

            function setDisplayNumber(val, formatter) {
                var valStr, displayValue;

                if (typeof val === "undefined") {
                    return 0;
                }

                valStr = val.toString();
                displayValue = valStr.replace(/,/g, "").replace(/[A-Za-z]/g, "");
                displayValue = parseFloat(displayValue);
                displayValue = !isNaN(displayValue) ? displayValue.toString() : "";

                // handle leading character -/0
                if (valStr.length === 1 && valStr[0] === "-") {
                    displayValue = valStr[0];
                } else if (valStr.length === 1 && valStr[0] === "0") {
                    displayValue = "";
                } else {
                    displayValue = $filter("number")(displayValue);
                }

                // handle decimal
                if (!attrs.integer) {
                    if (displayValue.indexOf(".") === -1) {
                        if (valStr.slice(-1) === ".") {
                            displayValue += ".";
                        } else if (valStr.slice(-2) === ".0") {
                            displayValue += ".0";
                        } else if (valStr.slice(-3) === ".00") {
                            displayValue += ".00";
                        }
                    } // handle last character 0 after decimal and another number
                    else {
                        if (valStr.slice(-1) === "0") {
                            displayValue += "0";
                        }
                    }
                }

                if (attrs.positive && displayValue[0] === "-") {
                    displayValue = displayValue.substring(1);
                }

                if (typeof formatter !== "undefined") {
                    return displayValue === "" ? 0 : displayValue;
                } else {
                    elem.val(displayValue === "0" ? "" : displayValue);
                }
            }

            function setModelNumber(val) {
                var modelNum = val
                    .toString()
                    .replace(/,/g, "")
                    .replace(/[A-Za-z]/g, "");
                modelNum = parseFloat(modelNum);
                modelNum = !isNaN(modelNum) ? modelNum : 0;
                if (modelNum.toString().indexOf(".") !== -1) {
                    modelNum = Math.round((modelNum + 0.00001) * 100) / 100;
                }
                if (attrs.positive) {
                    modelNum = Math.abs(modelNum);
                }
                return modelNum;
            }
        },
    };
});

app.directive("convertToNumber", function () {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (val) {
                return parseInt(val, 10);
            });
            ngModel.$formatters.push(function (val) {
                return "" + val;
            });
        },
    };
});

app.directive("format", [
    "$filter",
    function ($filter) {
        return {
            require: "?ngModel",
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$formatters.unshift(function (a) {
                    return $filter(attrs.format)(ctrl.$modelValue);
                });

                ctrl.$parsers.unshift(function (viewValue) {
                    var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, "");
                    elem.val($filter(attrs.format)(plainNumber));
                    return plainNumber;
                });
            },
        };
    },
]);
app.controller("dialogController", dialogController);

function dialogController($scope, $mdDialog) {
    $scope.status = "";
    $scope.items = [1, 2, 3, 4, 5];
    $scope.showAlert = function (ev) {
        $mdDialog.show(
            $mdDialog
                .alert()
                .parent(angular.element(document.querySelector("#dialogContainer")))
                .clickOutsideToClose(true)
                .title("TutorialsPoint.com")
                .textContent("Welcome to TutorialsPoint.com")
                .ariaLabel("Welcome to TutorialsPoint.com")
                .ok("Ok!")
                .targetEvent(ev)
        );
    };

    $scope.showConfirm = function (event) {
        var confirm = $mdDialog.confirm().title("Are you sure to delete the record?").textContent("Record will be deleted permanently.").ariaLabel("TutorialsPoint.com").targetEvent(event).ok("Yes").cancel("No");
        $mdDialog.show(confirm).then(
            function () {
                $scope.status = "Record deleted successfully!";
            },
            function () {
                $scope.status = "You decided to keep your record.";
            }
        );
    };

    $scope.showCustom = function (event) {
        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            template: "<md-dialog>" + "  <md-dialog-content>" + "     Welcome to TutorialsPoint.com" + "  </md-dialog-content>" + "</md-dialog>",
            controller: function DialogController($scope, $mdDialog) {
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                };
            },
        });
    };
}

app.directive("select2", function ($timeout, $parse) {
    return {
        restrict: "AC",
        require: "ngModel",
        link: function (scope, element, attrs) {
            console.log(attrs);
            $timeout(function () {
                $(element).select2();
                element.select2Initialized = true;
            }, 200);

            var refreshSelect = function () {
                if (!element.select2Initialized) return;
                $timeout(function () {
                    element.trigger("change");
                });
            };

            var recreateSelect = function () {
                if (!element.select2Initialized) return;
                $timeout(function () {
                    element.select2("destroy");
                    element.select2();
                });
            };

            scope.$watch(attrs.ngModel, refreshSelect);

            if (attrs.ngOptions) {
                var list = attrs.ngOptions.match(/ in ([^ ]*)/)[1];
                // watch for option list change
                scope.$watch(list, recreateSelect);
            }

            if (attrs.ngDisabled) {
                scope.$watch(attrs.ngDisabled, refreshSelect);
            }
        },
    };
});

/***************************** CONTROLLEUR DE GESTION DES NOTIFICATIONS *****************************
 ***********************************************************************************************/

app.controller("paramNotification", paramNotification);

function paramNotification($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    // Methode pour charger la liste des articles en alerte de stock
    $scope.OnChangeAlert = function () {
        $http.get("/api/exercice/getExerciceActif").then(function (response) {
            $scope.notification = response.data;
        });
    };
    $scope.OnChangeAlert();

    $scope.utilisateur;
    // Methode pour charger les notifications
    $scope.OnUser = function () {
        $http.get("/Security/getLoggers").then(function (response) {
            $scope.utilisateur = response.data;
        });
    };

    $scope.OnUser();
}

/***************************** CONTROLLEUR DE GESTION DES SAVE ET RESTAURATION DB *****************************
 ***********************************************************************************************/

app.controller("paramsauvegarde", paramsauvegarde);
function paramsauvegarde($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.showConfirmsauv = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Vous etes sur le point de vouloir sauvegarder cette base de donnée,")
            .textContent("Cet operation ne pourra plus être annulée")
            .ariaLabel("SM Avertissement")
            .targetEvent(event)
            .ok("Yes")
            .cancel("No");
        $mdDialog.show(confirm).then(
            function () {
                $scope.sauvegarder();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Sauvegarde de la BD éffectuée avec succès!",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Opération de sauvegarde annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    $scope.showConfirmrest = function (event, id) {
        var confirm = $mdDialog.confirm().title("Vous etes sur le point de vouloir restaurer votre système,").textContent("Cet operation ne pourra plus être annulée").ariaLabel("SM Avertissement").targetEvent(event).ok("Yes").cancel("No");
        $mdDialog.show(confirm).then(
            function () {
                $scope.restaurer();
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Opération de restauraton de donnée annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    $scope.sauvegarder = function () {
        $http.get("/api/dataBase/sauvegarder").then(function (response) {});
    };

    $scope.restaurer = function () {
        if ($scope.daterestauration.length < 14) {
            new PNotify({
                title: "GESCCOM-WEB Enregistrement",
                text: "Le format du pararmetre n'est pas correct",
                type: "warning",
                styling: "bootstrap3",
                delay: 3000,
                history: false,
                sticker: true,
            });
        } else {
            $http.get("/api/dataBase/restaurer?daterestauration=" + $scope.daterestauration).then(function (response) {
                $scope.confirm = response.data.resultat;
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: $scope.confirm,
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });

                $scope.confirm2 = response.data.Commentaire;
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: $scope.confirm2,
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            });
        }
    };
}

/***************************** CONTROLLEUR DE GESTION DES EXERCICES *****************************
 ***********************************************************************************************/

app.controller("paramExercice", paramExercice);

function paramExercice($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.exercice = {};
    };

    $scope.verifier = 0;
    $scope.exercice = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/exercice/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.exercice = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/exercice/save", $scope.exercice).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement de l'exercice " + " " + $scope.exercice.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/exercice/edite/" + id).then(function (response) {
            $scope.exercice = response.data;
			$scope.exercice.dateDebut = new Date($scope.exercice.dateDebut);
			$scope.exercice.dateFin = new Date($scope.exercice.dateFin);
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function () {
        $http.post("/api/exercice/save", $scope.exercice).then(
            function (response) {
                $scope.exercice = response.data;
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification de l'exercice" + " " + $scope.exercice.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/exercice/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    $scope.OnActive = function (id) {
        $http.get("/api/exercice/activeExercice/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    $scope.showConfirmActiver = function (event, id) {
        var confirm = $mdDialog.confirm().title("Etes-vous sur de vouloir ouvrire cet exercice,").textContent("Cette operation ne pourra plus être annuler").ariaLabel("UM Avertissement").targetEvent(event).ok("Oui").cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnActive(id);
                $scope.status = "Activation éffectuer avec succès";
				new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Activation éffectuer avec succès",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                $scope.status = "Opération annulée";
				new PNotify({
                    title: "GESCCOM-WEB Annulation",
                    text: "Opération annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}


/***************************** CONTROLLEUR DE GESTION DES PERIODES *****************************
 ***********************************************************************************************/

app.controller("paramMois", paramMois);

function paramMois($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.mois = {};
    };

    $scope.verifier = 0;
    $scope.mois = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/mois/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.mois = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/mois/save", $scope.mois).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du mois " + " " + $scope.mois.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/mois/edite/" + id).then(function (response) {
            $scope.mois = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function () {
        $http.post("/api/mois/save", $scope.mois).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du mois" + " " + $scope.mois.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/mois/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    $scope.OnActive = function (id) {
        $http.get("/api/mois/activeMois/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    $scope.showConfirmActiver = function (event, id) {
        var confirm = $mdDialog.confirm().title("Etes-vous sur de vouloir ouvrire cette période,").textContent("Cette operation ne pourra plus être annuler").ariaLabel("UM Avertissement").targetEvent(event).ok("Oui").cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnActive(id);
                $scope.status = "Activation éffectuer avec succès";
				new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Activation éffectuer avec succès",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                $scope.status = "Opération annulée";
				new PNotify({
                    title: "GESCCOM-WEB Annulation",
                    text: "Opération annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}






/***************************** CONTROLLEUR DE GESTION DE LA SOCIETE *****************************
 ***********************************************************************************************/

app.controller("paramSociete", paramSociete);

function paramSociete($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.societe = {};
    };

    $scope.verifier = 0;
    $scope.societe = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/societe/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.societe = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/societe/save", $scope.societe).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement de la societe " + " " + $scope.societe.raisonSociale + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/societe/edite/" + id).then(function (response) {
            $scope.societe = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function () {
        $http.post("/api/societe/save", $scope.societe).then(
            function (response) {
               // $scope.societe = response.data;
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification de la societe" + " " + $scope.societe.raisonSociale + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/societe/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

   

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}

/***************************** CONTROLLEUR DE GESTION DES BANQUES *****************************
 ***********************************************************************************************/

app.controller("paramBanque", paramBanque);

function paramBanque($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.banque = {};
    };

    $scope.verifier = 0;
    $scope.banque = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/banque/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.banque = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/banque/save", $scope.banque).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement de la banque " + " " + $scope.banque.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/banque/edite/" + id).then(function (response) {
            $scope.banque = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function () {
        $http.post("/api/banque/save", $scope.banque).then(
            function (response) {
                $scope.banque = response.data;
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification de la banque" + " " + $scope.banque.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/banque/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}


/***************************** CONTROLLEUR DE GESTION DES TYPES DE MAGASIN *****************************
 ***********************************************************************************************/

app.controller("paramTypeMagasin", paramTypeMagasin);

function paramTypeMagasin($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.typeMagasin = {};
    };

    $scope.verifier = 0;
    $scope.typeMagasin = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/typeMagasin/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.typeMagasin = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/typeMagasin/save", $scope.typeMagasin).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du type de magasin " + " " + $scope.typeMagasin.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/typeMagasin/edite/" + id).then(function (response) {
            $scope.typeMagasin = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function () {
        $http.post("/api/typeMagasin/save", $scope.typeMagasin).then(
            function (response) {
                
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du type de magasin" + " " + $scope.typeMagasin.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/typeMagasin/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}



/***************************** CONTROLLEUR DE GESTION DES TYPES DE PRESTATION *****************************
 ***********************************************************************************************/

app.controller("paramTypePrestation", paramTypePrestation);

function paramTypePrestation($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
   
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.typePrestation = {};
    };

		$http.get("/api/journal/liste").then(function (response) {
            $scope.getJournale = response.data;
        });
	
    $scope.verifier = 0;
    $scope.typeMagasin = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/typePrestation/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.typePrestation = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/typePrestation/save", $scope.typePrestation).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du type de prestation " + " " + $scope.typePrestation.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/typePrestation/edite/" + id).then(function (response) {
            $scope.typePrestation = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function () {
        $http.post("/api/typePrestation/save", $scope.typePrestation).then(
            function (response) {
                
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du type de prestation" + " " + $scope.typePrestation.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/typePrestation/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}


/***************************** CONTROLLEUR DE GESTION DES  MAGASINS *****************************
 ***********************************************************************************************/

app.controller("paramMagasin", paramMagasin);

function paramMagasin($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.magasin = {};
    };

    $scope.verifier = 0;
    $scope.magasin = {};
    $scope.users;

    $http.get("/api/scrussale/liste").then(function (response) {
            $scope.listescrussales = response.data;
        });

    $http.get("/api/typeMagasin/liste").then(function (response) {
            $scope.listetypemagasins = response.data;
        });

    $scope.OnChange = function () {
        $http.get("/api/magasin/liste/scrussale/"+$scope.magasin.scrussale
.id).then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.magasin.id = null;
			$scope.magasin.libelle = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/magasin/save", $scope.magasin).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du  magasin " + " " + $scope.magasin.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/magasin/edite/" + id).then(function (response) {
            $scope.magasin = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function () {
        $http.post("/api/magasin/save", $scope.magasin).then(
            function (response) {
                
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du magasin" + " " + $scope.magasin.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/magasin/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}






/***************************** CONTROLLEUR DE GESTION DES SCRUSSALE *****************************
 ***********************************************************************************************/

app.controller("paramScrussale", paramScrussale);

function paramScrussale($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
   
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.scrussale = {};
    };

    $scope.verifier = 0;
    $scope.scrussale = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/scrussale/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.scrussale = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();



    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/scrussale/save", $scope.scrussale).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du scrussale éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/scrussale/edite/" + id).then(function (response) {
            $scope.scrussale = response.data;
            $scope.verifier = 1;
        });
    };

  

    // Methode pour effectuer une modification
    $scope.OnUpdate = function () {
        $http.post("/api/scrussale/save", $scope.scrussale).then(
            function (response) {
              
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du scrussale" + " " + $scope.scrussale.pays + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/scrussale/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}

/***************************** CONTROLLEUR DE GESTION DES ANNULATIONS *****************************
 ***********************************************************************************************/

app.controller("paramAnnulation", paramAnnulation);

function paramAnnulation($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.annulation = {};
    };

    $scope.verifier = 0;
    $scope.annulation = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/annulations/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.annulation = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();
}

/***************************** CONTROLLEUR DE GESTION DES TYPE ****************************
 ***********************************************************************************************/

app.controller("paramType", paramType);

function paramType($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.type = {};
    };

    $scope.verifier = 0;
    $scope.type = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/type/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.type = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/type/save", $scope.type).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du type cheque " + " " + $scope.type.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/type/edite/" + id).then(function (response) {
            $scope.type = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function () {
        $http.post("/api/type/save", $scope.type).then(
            function (response) {
                $scope.type = response.data;
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du type cheque" + " " + $scope.type.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/type/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}

/***************************** CONTROLLEUR DE GESTION DES  ARTICLES *****************************
 ***********************************************************************************************/

app.controller("paramArticle", paramArticle);

function paramArticle($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location,fileUpload) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.article = {};
    };

    $scope.close = function () {
        $scope.articleRecupere = null;
    };
	$scope.upload = function () {
	    var file = $scope.myFile;

	    console.log("file is ");
	    console.dir(file);
	    if (file != undefined) {
	        var uploadUrl = "/api/article/fileUpload?idarticle=" + $scope.articleRecupere.id;
	
	        fileUpload.uploadFileToUrl(file, uploadUrl);
	
	        $("#myFile").val(null);
	    }
	};


   $http.get("/api/classe/liste").then(function (response) {
            $scope.listeclasses = response.data;
    });
  
   $http.get("/api/conditionnement/liste").then(function (response) {
            $scope.findconditionnements = response.data;
    });
 
    $http.get("/api/sousGroup/liste").then(function (response) {
            $scope.findsousgroup = response.data;
    });

    $scope.OnSousClasses = function (id) {
        $http.get("/api/sousClasse/liste/classe/" + id).then(function (response) {
            $scope.findsousclasses = response.data;
        });
    };

    $scope.OnSubdivision = function (id) {
        $http.get("/api/subdivision/liste/sousClasse/" + id).then(function (response) {
            $scope.findsubdivisions = response.data;
        });
    };

    $scope.OnCompte = function (id) {
        $http.get("/api/compte/liste/subdivision/" + id).then(function (response) {
            $scope.findcomptes = response.data;
        });
    };

    $scope.verifier = 0;
    $scope.article = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/article/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.article.id = null;

			$scope.article.prixUnitaire = null;
			$scope.article.designation = null;
			$scope.article.reference = null;
			$scope.article.description = null;
			$scope.article.stock = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

			
	   $scope.onSavePhoto=function(){
       		
				$scope.upload();
       			var file = $scope.myFile;
       			
       			if (file!=undefined){
      			$http.get("/api/article/photo2?idarticle="+$scope.articleRecupere.id)
      			.then(function(response){ 
      				
      				
      			},function errorCallback(response) {
      				$scope.pop='Le fichier est introuvable';
					new PNotify({
		                    title: "GESCCOM-WEB Enregistrement",
		                    text: "Le fichier est introuvable",
		                    type: "warning",
		                    styling: "bootstrap3",
		                    delay: 3000,
		                    history: false,
		                    sticker: true,
		                });	
      			   });
       	
       	 	};
       	}		

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/article/save", $scope.article).then(
            function (response) {
	
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement de la devise " + " " + $scope.article.reference + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/article/edite/" + id).then(function (response) {
            $scope.article = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une edition
    $scope.OnEditePhoto = function (id) {
        $http.get("/api/article/edite/" + id).then(function (response) {
            $scope.articleRecupere = response.data;
			
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function () {
        $http.post("/api/article/update", $scope.article).then(
            function (response) {
                
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification de l artcile" + " " + $scope.article.designation + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/article/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}


/***************************** CONTROLLEUR DE GESTION DES  CLIENTS *****************************
 ***********************************************************************************************/

app.controller("paramClient", paramClient);

function paramClient($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location,fileUpload) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.client = {};
    };

	
	 $scope.fermer = function () {
        $scope.recupererClient = null;
    };


   $http.get("/api/classe/liste").then(function (response) {
            $scope.listeclasses = response.data;
    });
  
   $http.get("/api/conditionnement/liste").then(function (response) {
            $scope.findconditionnements = response.data;
    });

   $http.get("/api/scrussale/liste").then(function (response) {
            $scope.findscrussales = response.data;
    });

   $http.get("/api/gestionnaire/liste").then(function (response) {
            $scope.findgestionnaires = response.data;
    });

	$http.get("/api/groupClient/liste").then(function (response) {
            $scope.findgroupClients = response.data;
    });
 
    $http.get("/api/sousGroup/liste").then(function (response) {
            $scope.findsousgroup = response.data;
    });

    $scope.OnSousClasses = function (id) {
        $http.get("/api/sousClasse/liste/classe/" + id).then(function (response) {
            $scope.findsousclasses = response.data;
        });
    };

    $scope.OnSubdivision = function (id) {
        $http.get("/api/subdivision/liste/sousClasse/" + id).then(function (response) {
            $scope.findsubdivisions = response.data;
        });
    };

    $scope.OnCompte = function (id) {
        $http.get("/api/compte/liste/subdivision/" + id).then(function (response) {
            $scope.findcomptes = response.data;
        });
    };

    $scope.verifier = 0;
    $scope.article = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/client/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.client.id = null;
			$scope.client.raisonSocial = null;
			$scope.client.representant = null;
			$scope.client.contact = null;
			$scope.client.groupClient.id = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

			
	   $scope.onSavePhoto=function(){
       		
				$scope.upload();
       			var file = $scope.myFile;
       			
       			if (file!=undefined){
      			$http.get("/api/article/photo2?idarticle="+$scope.articleRecupere.id)
      			.then(function(response){ 
      				
      				
      			},function errorCallback(response) {
      				$scope.pop='Le fichier est introuvable';
					new PNotify({
		                    title: "GESCCOM-WEB Enregistrement",
		                    text: "Le fichier est introuvable",
		                    type: "warning",
		                    styling: "bootstrap3",
		                    delay: 3000,
		                    history: false,
		                    sticker: true,
		                });	
      			   });
       	
       	 	};
       	}		

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/client/save", $scope.client).then(
            function (response) {
	
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du client " + " " + $scope.client.raisonSocial + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/client/edite/" + id).then(function (response) {
            $scope.client = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une edition
    $scope.OnEditeInfo = function (id) {
        $http.get("/api/client/edite/" + id).then(function (response) {
            $scope.recupererClient = response.data;
			
        });
    };

   $scope.OnActive = function (id) {
        $http.get("/api/client/activeClient/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

  $scope.OnDesactive = function (id) {
        $http.get("/api/client/desactiveClient/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function () {
        $http.post("/api/client/update", $scope.client).then(
            function (response) {
                
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du client" + " " + $scope.client.raisonSocial + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/client/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}



/***************************** CONTROLLEUR DE GESTION DES FOURNISSEURS ***************************** 
***********************************************************************************************/

app.controller('paramFournisseur', paramFournisseur);

function paramFournisseur($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {

	$scope.user = {
			data: []
		};

	$scope.init = function () {
		$scope.fournisseur = {};
	}
   
 	$scope.verifier = 0;
	$scope.fournisseur = {};
    $scope.users;

	$scope.OnChange = function () {
		  $http.get("api/fournisseur/liste")
			.then(function (response) {
				$scope.users = response.data;
				$scope.usersTable = new NgTableParams({
					page: 1,
					count: 5
				}, {
				   total: $scope.users.length,
						getData: function (params) {
							$scope.data = params.sorting() ? $filter('orderBy')($scope.users, params.orderBy()) : $scope.users;
							$scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
							$scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
							return $scope.data;
						}
					});

					$scope.fournisseur = null;
					$scope.verifier = 0;
					$scope.user.data = null;
				});

		};
	$scope.OnChange();
	
	// Methode pour pour effectuer un enregistrement 
	$scope.OnSave = function () 
	{
		  $http.post("api/fournisseur/save", $scope.fournisseur)
			   .then(function (response) {
					$scope.OnChange();
				new PNotify({
		                 title: 'GesStock Enregistrement',
		                 text:  'Enrégistrement du fournisseur '  +" "+$scope.fournisseur.nom+" "+  'éffectué',
		                 type:  'success',
		                 styling: 'bootstrap3',
		                 delay:3000,
		                 history:false,
		                 sticker:true
		                  
		                });
				},function errorCallback(response){
	    			   new PNotify
					   ({
		                     title: 'GesStock Message d\'erreur',
		                     text: 'Une erreur liée au serveur s\'est produite',
		                     type: 'error',
		                     styling: 'bootstrap3',
		                     delay:3000,
		                     history:false,
		                     sticker:true
		                      
	                    });
	    	})
	 }

     // Methode pour effectuer une edition
	 $scope.OnEdite = function (id) 
	 {
		$http.get("api/fournisseur/edite/" + id)
			 .then(function (response) 
		     {
				$scope.fournisseur = response.data;
				$scope.verifier = 1;
			 });
	 };

     // Methode pour effectuer une modification 
	 $scope.OnUpdate = function (id) 
	 {
		
			 $http.post("api/fournisseur/save", $scope.fournisseur)
			   .then(function (response) {
					$scope.fournisseur = response.data;
					$scope.OnChange();
				new PNotify({
		                 title: 'GesStock Modification',
		                 text:  'Modification du fournisseur'+" "+$scope.fournisseur.nom+" "+'éffectué',
		                 type:  'success',
		                 styling: 'bootstrap3',
		                 delay:3000,
		                 history:false,
		                 sticker:true
		                  
		                });
				},function errorCallback(response){
	    			   new PNotify
					   ({
		                     title: 'GesStock Message d\'erreur',
		                     text: 'Une erreur liée au serveur s\'est produite',
		                     type: 'error',
		                     styling: 'bootstrap3',
		                     delay:3000,
		                     history:false,
		                     sticker:true
		                      
	                    });
	    	})
	 };

	 // Methode pour effectuer une suppression
	 $scope.OnDelete = function (id) 
	 {
		$http.delete("api/fournisseur/delete/" + id)
			 .then(function (response) 
		     {
				$scope.OnChange();
			 });
	 };
		
	 // Methode de notification pour la suppression
	 $scope.showConfirm = function (event, id) 
     {
			var confirm = $mdDialog.confirm()
				.title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
				.textContent('Cet operation ne pourra plus être annuler')
				.ariaLabel('GesStock Avertissement')
				.targetEvent(event)
				.ok('Oui')
				.cancel('Non');
			$mdDialog.show(confirm).then(function () {
				$scope.OnDelete(id);
				new PNotify({
	                title: 'GesStock Validation',
	                text:  'Enregistrement supprimer avec succes',
	                type: 'info',
	                styling: 'bootstrap3',
	                delay:3000,
	                history:false,
	                sticker:true
	                 
	               });
			}, function () {
				new PNotify({
	                title: 'GesStock Information ',
	                text:  'Opération de suppression annulée',
	                type: 'warning',
	                styling: 'bootstrap3',
	                delay:3000,
	                history:false,
	                sticker:true
	                 
	               });
			});
		};
		$scope.regex = '^[a-zA-Z0-9._-]+$';
		
		$scope.transfererx = function () 
		{
			$("#myModal").modal({
				backdrop: "static"
			});
			$("#myModal").modal({
				keyboard: true
			});
		};

		$scope.fermer = function ()
	    {
			$("#myModal").modal('hide');
		};

};



/***************************** CONTROLLEUR DE GESTION DES  ENTREE EN STOCKS *****************************
 ***********************************************************************************************/

app.controller("paramEntree", paramEntree);

function paramEntree($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location,fileUpload) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.entreeStock = {};
    };

	
	 $scope.fermer = function () {
        $scope.entreeStockDetail = null;
    };

    $http.get("/api/sousGroup/liste").then(function (response) {
        $scope.listesousgroups = response.data;
    });

	$scope.OnChangeArticle = function () {
        $http.get("/api/article/liste/sousGroup/" +  $scope.categorie.id).then(function (response) {
            $scope.listearticles = response.data;
        });
    };


    $http.get("/api/fournisseur/liste").then(function (response) {
            $scope.listefournisseurs = response.data;
    });
  

    $scope.verifier = 0;
    $scope.entreeStock = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/entreeStock/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.entreeStock= null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

			
	

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/entreeStock/save", $scope.entreeStock).then(
            function (response) {
	
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement de l entrée en stock " + " " + $scope.entreeStock.code + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };


 	// Methode pour pour effectuer un enregistrement
    $scope.OnSaveDetailEntree = function () {
        $http.post("/api/detailEntreeStock/save/"+$scope.entreeStockDetail.id, $scope.detailentree).then(
            function (response) {
	
                $scope.OnChangeDetails();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du detail stock éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };


    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/entreeStock/edite/" + id).then(function (response) {
            $scope.entreeStockDetail = response.data;
			$scope.OnChangeDetails();
            //$scope.verifier = 1;
        });
    };


    // Methode pour effectuer une modification
    $scope.OnUpdate = function () {
        $http.post("/api/entreeStock/save", $scope.entreeStock).then(
            function (response) {
                
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification de l entrée en stock" + " " + $scope.entreeStock.code + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/entreeStock/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };


	$scope.users1;

    $scope.OnChangeDetails = function () {
        $http.get("/api/detailEntreeStock/liste/" +$scope.entreeStockDetail.id).then(function (response) {
            $scope.users1 = response.data;
            $scope.usersTable1 = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data1 = params.sorting() ? $filter("orderBy")($scope.users1, params.orderBy()) : $scope.users1;
                        $scope.data1 = params.filter() ? $filter("filter")($scope.data1, params.filter()) : $scope.data1;
                        $scope.data1 = $scope.data1.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );
			$scope.detailentree = null;
            $scope.user.data = null;
        });
    };


	// Methode pour effectuer une edition
    $scope.OnEditeDetails = function (id) {
        $http.get("/api/detailEntreeStock/edite/" + id).then(function (response) {
            $scope.detailentree = response.data;
			
        });
    };

// Methode pour effectuer une edition
    $scope.OnActualiseStock = function (id) {
        $http.get("/api/detailEntreeStock/actualiser/" + id).then(function (response) {
           if(response.data == true){
				new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Approvisionement du stock deja effectué",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
			
			}else
			{
				new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Approvisionement du stock éffectuer avec success",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
				$scope.OnChange();
			}
			
        });
    };


    // Methode pour effectuer une suppression
    $scope.OnDeleteDetails = function (id) {
        $http.delete("/api/detailEntreeStock/delete/" + id).then(function (response) {
            $scope.OnChangeDetails();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm2 = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir valider cet approvisionement,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnActualiseStock(id);
                
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération d approvisionement annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };




}





















/***************************** CONTROLLEUR DE GESTION DES  LIEUX *****************************
 ***********************************************************************************************/

app.controller("paramLieux", paramLieux);

function paramLieux($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.lieux = {};
    };

    $scope.verifier = 0;
    $scope.lieux = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/lieux/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.lieux = null;
            $scope.verifier = 0;
            $scope.user.data = null;
            $scope.lieux.astitulaire = null;
        });
    };
    $scope.OnChange();

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/lieux/save", $scope.lieux).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du lieu " + " " + $scope.lieux.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/lieux/edite/" + id).then(function (response) {
            $scope.lieux = response.data;
            $scope.verifier = 1;
            $http.get("/api/lieux/testtitulaire/" + id).then(function (response) {
                //$scope.titu=response.data;
                if (response.data == true) {
                    if ($scope.lieux.astitulaire == true) {
                        $scope.titu = false;
                    } else {
                        $scope.titu = true;
                    }
                }
            });
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function () {
        $http.post("/api/lieux/save", $scope.lieux).then(
            function (response) {
                $scope.type = response.data;
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du lieu" + " " + $scope.lieux.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/lieux/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}

/***************************** CONTROLLEUR DE GESTION DES CLIENTS *****************************
 ***********************************************************************************************/

app.controller("paramDashboards", paramDashboards);

function paramDashboards($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.articleDispo;

    // Nombre de  bénéficiare
    $scope.OnNombreBeneficiaire = function () {
        $http.get("/api/src/nombreBeneficiaire").then(function (response) {
            $scope.nombreBeneficiaire = response.data;
        });
    };

    $scope.OnNombreBeneficiaire();

    // Nombre de  Cheque Actif
    $scope.OnNombreChequeActif = function () {
        $http.get("/api/src/nombreChequeActif").then(function (response) {
            $scope.nombreChequeActif = response.data;
        });
    };

    $scope.OnNombreChequeActif();

    // Nombre de  Cheque Emis
    $scope.OnNombreChequeEmis = function () {
        $http.get("/api/src/nombreChequeEmis").then(function (response) {
            $scope.nombreChequeEmis = response.data;
        });
    };

    $scope.OnNombreChequeEmis();

    // Nombre de  Cheque Emis
    $scope.OnNombreChequeAnnule = function () {
        $http.get("/api/src/nombreChequeAnnule").then(function (response) {
            $scope.nombreChequeAnnule = response.data;
        });
    };

    $scope.OnNombreChequeAnnule();

    // Nombre de  Signataire
    $scope.OnNombreSignataire = function () {
        $http.get("/api/src/nombreSignataire").then(function (response) {
            $scope.nombreSignataire = response.data;
        });
    };

    $scope.OnNombreSignataire();

    // Montant Totale de l'exercice
    $scope.OnTotal = function () {
        $http.get("/api/src/montantTotale").then(function (response) {
            $scope.montantTotale = response.data;
        });
    };

    $scope.OnTotal();
}

/***************************** CONTROLLEUR DE GESTION DES CHEQUE *****************************
 ***********************************************************************************************/

app.controller("paramCheque", paramCheque);

function paramCheque($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.cheque = {};
    };

    $http.get("/api/banque/liste").then(function (response) {
        $scope.banques = response.data;
    });

    $http.get("/api/type/liste").then(function (response) {
        $scope.typesCheques = response.data;
    });

    $scope.verifier = 0;
    $scope.cheque = {};
    $scope.users = [];

    $scope.OnChange = function (id) {
        if (id == undefined) {
            $http.get("/api/cheque/liste").then(function (response) {
                $scope.users = response.data;
                $scope.usersTable = new NgTableParams(
                    {
                        page: 1,
                        count: 5,
                    },
                    {
                        total: $scope.users.length,
                        getData: function (params) {
                            $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                            $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                            $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            return $scope.data;
                        },
                    }
                );

                $scope.cheque.id = null;
                $scope.cheque.serie = null;
                $scope.cheque.numero = null;
                $scope.cheque.typeCheque.id = null;
                $scope.verifier = 0;
                $scope.user.data = null;
            });
        } else {
            $http.get("/api/cheque/liste/banque/" + id).then(function (response) {
                $scope.users = response.data;
                $scope.usersTable = new NgTableParams(
                    {
                        page: 1,
                        count: 5,
                    },
                    {
                        total: $scope.users.length,
                        getData: function (params) {
                            $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                            $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                            $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            return $scope.data;
                        },
                    }
                );

                $scope.cheque.id = null;
                $scope.cheque.serie = null;
                $scope.cheque.numero = null;
                $scope.cheque.typeCheque.id = null;
                $scope.verifier = 0;
                $scope.user.data = null;
            });
        }
    };
    $scope.OnChange();

    $scope.cheque.nombre = 0;
    // Methode pour generer
    $scope.OnGenerate = function () {
        $http.post("/api/cheque/generate/" + $scope.cheque.nombre + "/" + $scope.cheque.numero, $scope.cheque).then(
            function (response) {
                $scope.OnChange($scope.cheque.banque.id);
                if (response.data == true) {
                    new PNotify({
                        title: "GESCCOM-WEB Modification",
                        text: "Génération des cheque éffectué",
                        type: "success",
                        styling: "bootstrap3",
                        delay: 3000,
                        history: false,
                        sticker: true,
                    });
                } else {
                    new PNotify({
                        title: "GESCCOM-WEB Message d'erreur",
                        text: "Le renseigner le nombre de feuille chèque nombre > 0",
                        type: "error",
                        styling: "bootstrap3",
                        delay: 3000,
                        history: false,
                        sticker: true,
                    });
                }
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur cet numéro de chèque existe déja",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
        $scope.cheque.nombre = 0;
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/cheque/edite/" + id).then(function (response) {
            $scope.cheque = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/cheque/save", $scope.cheque).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du cheque" + " " + $scope.cheque.numero + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
        $scope.cheque.nombre = 0;
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function (id) {
        $http.post("/api/cheque/save", $scope.cheque).then(
            function (response) {
                $scope.unite = response.data;
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du cheque " + " " + $scope.cheque.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/cheque/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}

/***************************** CONTROLLEUR DE GESTION DES FOURNISSEURS *****************************
 ***********************************************************************************************/

app.controller("paramBeneficiaire", paramBeneficiaire);

function paramBeneficiaire($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.beneficiaire = {};
    };

    $scope.verifier = 0;
    $scope.beneficiaire = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/beneficiaire/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.beneficiaire = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/beneficiaire/save", $scope.beneficiaire).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du beneficiaire " + " " + $scope.beneficiaire.nom + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/beneficiaire/edite/" + id).then(function (response) {
            $scope.beneficiaire = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function (id) {
        $http.post("/api/beneficiaire/save", $scope.beneficiaire).then(
            function (response) {
                $scope.beneficiaire = response.data;
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du beneficiaire" + " " + $scope.beneficiaire.nom + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/beneficiaire/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}



/***************************** CONTROLLEUR DE GESTION DES MODE DE REGLEMENT *****************************
 ***********************************************************************************************/

app.controller("paramReglement", paramReglement);

function paramReglement($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.reglement = {};
    };

    $scope.verifier = 0;
    $scope.reglement = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/modeReglement/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.reglement = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/modeReglement/save", $scope.reglement).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du mode de reglement " + " " + $scope.reglement.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/modeReglement/edite/" + id).then(function (response) {
            $scope.reglement = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function (id) {
        $http.post("/api/modeReglement/save", $scope.reglement).then(
            function (response) {
               // $scope.reglement = response.data;
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du mode reglement" + " " + $scope.reglement.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/modeReglement/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}




/***************************** CONTROLLEUR DE GESTION DES PAIMENTS FACTURE CLIENT *****************************
 ***********************************************************************************************/

app.controller("paramPaiement", paramPaiement);

function paramPaiement($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.paiement = {};
    };

    $scope.verifier = 0;
    $scope.paiement = {};
    $scope.users;

    $http.get("/api/modeReglement/liste").then(function (response) {
            $scope.Lreglements = response.data;
        });

    $http.get("/api/client/liste/scrussale").then(function (response) {
            $scope.Lclients = response.data;
        });

    $http.get("/api/banque/liste").then(function (response) {
            $scope.Lbanques = response.data;
        });
   
    $scope.OnChangeFacture = function () {
	  $http.get("/api/vente/liste/nonregler/"+ $scope.clientID).then(function (response) {
            $scope.Lfactures = response.data;
 		    
			$scope.OnGetInfo();
        });
	}
	
	 $scope.OnRecuperMontant = function () {
	  $http.get("/api/vente/edite/"+ $scope.paiement.vente.id).then(function (response) {
            $scope.venteRecup = response.data;
 		    $scope.paiement.montantPayement = $scope.venteRecup.montantTTC;
        });
	}
	
	$scope.OnDesactiveFacture = function (id) {
	  $http.get("/api/reglement/miseajours/"+ id).then(function (response) {
		
        });
	}
	
	
	$scope.generateEcritureReglement = function () 
    {
        $http.get("/api/reglement/generate/" + $scope.reglementRecuperer.id).then(function (response) {
                  
						if( response.data == false )
						{
							 new PNotify({
			                    title: "GESCCOM-WEB Validation",
			                    text: "Cette écriture à été déja générée",
			                    type: "warning",
			                    styling: "bootstrap3",
			                    delay: 3000,
			                    history: false,
			                    sticker: true,
			                });
						}
						else
						{
							 new PNotify({
			                    title: "GESCCOM-WEB Validation",
			                    text: "Génération de l\'ecriture comptable éffectuer avec succes",
			                    type: "info",
			                    styling: "bootstrap3",
			                    delay: 3000,
			                    history: false,
			                    sticker: true,
			                });
							
					   }
					
                });
          
     };

	$scope.generateEcritureReglementEspece = function () 
    {
        $http.get("/api/reglement/generate/espece/" + $scope.reglementRecuperer.id).then(function (response) {
                  
						if( response.data == false )
						{
							 new PNotify({
			                    title: "GESCCOM-WEB Validation",
			                    text: "Cette écriture à été déja générée",
			                    type: "warning",
			                    styling: "bootstrap3",
			                    delay: 3000,
			                    history: false,
			                    sticker: true,
			                });
						}
						else
						{
							 new PNotify({
			                    title: "GESCCOM-WEB Validation",
			                    text: "Génération de l\'ecriture comptable éffectuer avec succes",
			                    type: "info",
			                    styling: "bootstrap3",
			                    delay: 3000,
			                    history: false,
			                    sticker: true,
			                });
							
					   }
					
                });
          
     };
	
	
	$scope.generateEcritureReglementCheque = function () 
    {
        $http.get("/api/reglement/generate/cheque/" + $scope.reglementRecuperer.id).then(function (response) {
                  
						if( response.data == false )
						{
							 new PNotify({
			                    title: "GESCCOM-WEB Validation",
			                    text: "Cette écriture à été déja générée",
			                    type: "warning",
			                    styling: "bootstrap3",
			                    delay: 3000,
			                    history: false,
			                    sticker: true,
			                });
						}
						else
						{
							 new PNotify({
			                    title: "GESCCOM-WEB Validation",
			                    text: "Génération de l\'ecriture comptable éffectuer avec succes",
			                    type: "info",
			                    styling: "bootstrap3",
			                    delay: 3000,
			                    history: false,
			                    sticker: true,
			                });
							
					   }
					
                });
          
     };
	
	$scope.OnGetInfo = function () {
	  $http.get("/api/client/edite/"+ $scope.clientID).then(function (response) {
            $scope.clients = response.data;
			$scope.paiement.vente.id = null;
        });
	}
	
	$scope.OnGetInfo2 = function () {
	  $http.get("/api/client/edite/"+ $scope.clientID).then(function (response) {
            $scope.clients = response.data;
        });
	}


    $scope.OnChange = function () {
        $http.get("/api/reglement/liste/vente/"+ $scope.paiement.vente.id).then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

           
			$scope.situationclient();
            $scope.user.data = null;
        });
    };
    

    $scope.validerReglement=function()
	{
 		$scope.testervalidation($scope.paiement.vente.id,$scope.paiement.montantPayement);
 	};
 	
 	
	$scope.testervalidation=function(dette,montant){
		var montant_a_payer=null;
 		$http.get("/api/reglement/testerValidation/"+dette+"/"+montant)
 			.then(function(response){
				if (response.data == 3)
				{
				
					new PNotify({
		                title: 'GesStock notification ',
		                text:  'Attention !!! Le montant payé ne peut être superieur au montant à payer.',
		                type: 'warning',
		                styling: 'bootstrap3',
		                delay:3000,
		                history:false,
		                sticker:true
		                 
		               });
				  $scope.solde="ko";
					
				}
				else if  (response.data == 1)
				{
					$http.post("/api/reglement/save",$scope.paiement)
	         		.then(function(response){  	
	         			   $scope.paiement.datePayement=new Date($scope.paiement.datePayement);
	         		       $scope.reglementRecuperer =response.data;
							
						   $scope.OnDesactiveFacture($scope.reglementRecuperer.id);
							
	         		       $scope.OnChange();
						   $scope.OnGetInfo2();
						   $scope.situationclient();
		         		   $scope.paiement.id=null;
		         		   $scope.paiement.montantPayement=0;
 						   $scope.paiement.reference=null;
						   $scope.paiement.obervation=null;
						   console.log($scope.reglementRecuperer.modeReglement.id)
						   if($scope.reglementRecuperer.modeReglement.id == 3)
							{
							    $scope.generateEcritureReglement();
						    }else if($scope.reglementRecuperer.modeReglement.id == 2){
							 $scope.generateEcritureReglementCheque()
						    }else {
							 $scope.generateEcritureReglementEspece()
						    }
	         		})
					
	         		new PNotify({
		                title: 'Frigosoft notification ',
		                text:  'Payement effectuer avec succès.',
		                type: 'success',
		                styling: 'bootstrap3',
		                delay:3000,
		                history:false,
		                sticker:true
		                 
		               });
	         		   $scope.solde="ko"
	         		 
					
				}
				
				else if  (response.data==2){
					$http.post("/api/reglement/save",$scope.paiement)
	         		.then(function(response){  	
	         			  
						   $scope.paiement.datePayement=new Date($scope.paiement.datePayement);
	         		       		 $scope.reglementRecuperer = response.data;	
	         		       $scope.OnChange();
							$scope.OnGetInfo2();
						   $scope.situationclient();
		         		   $scope.paiement.id=null;
		         		   $scope.paiement.montantPayement=0;
 						   $scope.paiement.reference=null;
						   $scope.paiement.obervation=null;
 						  
		 				    if($scope.reglementRecuperer.modeReglement.id == 3)
							{
							    $scope.generateEcritureReglement()
						    }
							else if($scope.reglementRecuperer.modeReglement.id == 2){
							 $scope.generateEcritureReglementCheque()
						    }else {
							 $scope.generateEcritureReglementEspece()
						    }
	         		})
					
	         		new PNotify({
		                title: 'GesStock notification ',
		                text:  'Payement effectuer avec succès.',
		                type: 'success',
		                styling: 'bootstrap3',
		                delay:3000,
		                history:false,
		                sticker:true
		                 
		               });
	         		   $scope.solde="ko"
					
				}
				 
				  				
 			});
 	 
 	};

    // renvoye par hashmap de ap, p ,r
	$scope.situationclient=function(){
 		$http.get("/api/reglement/apayer_payer_rapayer/"+$scope.paiement.vente.id)
 			.then(function(response){
				
				$scope.situation= response.data; 
				
 			});

 	};

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/modeReglement/edite/" + id).then(function (response) {
            $scope.reglement = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function (id) {
        $http.post("/api/modeReglement/save", $scope.reglement).then(
            function (response) {
               // $scope.reglement = response.data;
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du mode reglement" + " " + $scope.reglement.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/modeReglement/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}


/***************************** CONTROLLEUR DE GESTION DES Roles *****************************
 ***********************************************************************************************/

app.controller("paramRoles", paramRoles);

function paramRoles($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.roles = {};
    };

    $scope.verifier = 0;
    $scope.roles = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/Security/listeRole").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.roles = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/Security/addRole", $scope.roles).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du profil" + " " + $scope.roles.role + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/Security/updaterole/" + id).then(function (response) {
            $scope.roles = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function () {
        $http.post("/Security/addRole", $scope.roles).then(
            function (response) {
                $scope.roles = response.data;
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification de la catégorie" + " " + $scope.roles.role + " " + " éffectué avec succès",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/Security/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}

/***************************** CONTROLLEUR DE GESTION DES TVA *****************************
 ***********************************************************************************************/

app.controller("paramParametre", paramParametre);

function paramParametre($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
   
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.parametre = {};
    };


   $http.get("/api/scrussale/liste").then(function (response) {
            $scope.findscrussales = response.data;
    });
  
    $scope.verifier = 0;
    $scope.parametre = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/parametreTVA/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.parametre = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();
    

	// Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/parametreTVA/save", $scope.parametre).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement de la TVA" + " " + $scope.parametre.taux + " %" + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/parametreTVA/edite/" + id).then(function (response) {
            $scope.parametre = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function (id) {
        $http.post("/api/parametreTVA/save", $scope.parametre).then(
            function (response) {
               // $scope.parametre = response.data;
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification de la TVA " + " " + $scope.parametre.taux + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/parametreTVA/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}

/***************************** CONTROLLEUR DE GESTION DES STATUTS COMMANDE *****************************
 ***********************************************************************************************/

app.controller("paramStatutCommande", paramStatutCommande);

function paramStatutCommande($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.statutCommande = {};
    };

    $scope.verifier = 0;
    $scope.statutCommande = {};
    $scope.users;

 

    $scope.OnChange = function () {
        $http.get("/api/statutCommande/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.statutCommande = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/statutCommande/save", $scope.statutCommande).then(
            function (response) {
             
                $scope.OnChange();

                    new PNotify({
                        title: "GESCCOM-WEB Enregistrement",
                        text: "Enrégistrement du Statut de Commande" + " " + $scope.statutCommande.libelle + " " + "éffectué",
                        type: "success",
                        styling: "bootstrap3",
                        delay: 3000,
                        history: false,
                        sticker: true,
                    });
                
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/statutCommande/edite/" + id).then(function (response) {
            $scope.statutCommande = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function (id) {
        $http.post("/api/statutCommande/save", $scope.statutCommande).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du Statut de Sommande " + " " + $scope.statutCommande.libelle + " " + " éffectué avec succès",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/statutCommande/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}

/***************************** CONTROLLEUR DE GESTION DES STATUTS LIVRAISON *****************************
 ***********************************************************************************************/

app.controller("paramStatutLivraison", paramStatutLivraison);

function paramStatutLivraison($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.statutLivraison = {};
    };

  

    $scope.verifier = 0;
    $scope.statutLivraison = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/statutLivraison/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.statutLivraison = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
  $scope.OnChange();
    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/statutLivraison/save", $scope.statutLivraison).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du statut de livraison " + " " + $scope.statutLivraison.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/statutLivraison/edite/" + id).then(function (response) {
            $scope.statutLivraison = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function (id) {
        $http.post("/api/statutLivraison/save", $scope.statutLivraison).then(
            function (response) {
                $scope.unitevente = response.data;
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification  du statut de livraison " + " " + $scope.statutLivraison.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/statutLivraison/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}



/***************************** CONTROLLEUR DE GESTION DES CONDITIONNEMENTS *****************************
 ***********************************************************************************************/

app.controller("paramConditionnement", paramConditionnement);

function paramConditionnement($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.conditionnement = {};
    };

  

    $scope.verifier = 0;
    $scope.conditionnement = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/conditionnement/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.conditionnement = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
  $scope.OnChange();
    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/conditionnement/save", $scope.conditionnement).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du conditionnement " + " " + $scope.conditionnement.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
				 $scope.verifiers = response.data;
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite" + $scope.verifiers+ " " +"",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/conditionnement/edite/" + id).then(function (response) {
            $scope.conditionnement = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function (id) {
        $http.post("/api/conditionnement/save", $scope.conditionnement).then(
            function (response) {
              
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification  du conditionnement " + " " + $scope.conditionnement.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/conditionnement/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}


/***************************** CONTROLLEUR DE GESTION DES GROUP CLIENT *****************************
 ***********************************************************************************************/

app.controller("paramGroupClient", paramGroupClient);

function paramGroupClient($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.groupClient = {};
    };

  

    $scope.verifier = 0;
    $scope.groupClient = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/groupClient/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.groupClient = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
  $scope.OnChange();
    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/groupClient/save", $scope.groupClient).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du group de Client " + " " + $scope.groupClient.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
				 $scope.verifiers = response.data;
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/groupClient/edite/" + id).then(function (response) {
            $scope.groupClient = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function (id) {
        $http.post("/api/groupClient/save", $scope.groupClient).then(
            function (response) {
              
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification  du group de Client " + " " + $scope.groupClient.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/groupClient/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}



/***************************** CONTROLLEUR DE GESTION DES GESTIONNAIRES *****************************
 ***********************************************************************************************/

app.controller("paramGestionnaire", paramGestionnaire);

function paramGestionnaire($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.gestionnaire = {};
    };

  

    $scope.verifier = 0;
    $scope.gestionnaire = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/gestionnaire/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.gestionnaire = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
  $scope.OnChange();
    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/gestionnaire/save", $scope.gestionnaire).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du gestionnaire " + " " + $scope.gestionnaire.nom + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
				 $scope.verifiers = response.data;
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/gestionnaire/edite/" + id).then(function (response) {
            $scope.gestionnaire = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function (id) {
        $http.post("/api/gestionnaire/save", $scope.gestionnaire).then(
            function (response) {
              
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification  du gestionnaire " + " " + $scope.gestionnaire.nom + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/gestionnaire/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}




/***************************** CONTROLLEUR DE GESTION DES GROUP PRODUITS *****************************
 ***********************************************************************************************/

app.controller("paramGroup", paramGroup);

function paramGroup($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.group = {};
    };

  

    $scope.verifier = 0;
    $scope.group = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/groupProduit/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.group = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
  $scope.OnChange();
    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/groupProduit/save", $scope.group).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du group " + " " + $scope.group.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
				 $scope.verifiers = response.data;
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite" + $scope.verifiers+ " " +"",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/groupProduit/edite/" + id).then(function (response) {
            $scope.group = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function (id) {
        $http.post("/api/groupProduit/save", $scope.group).then(
            function (response) {
              
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification  du group " + " " + $scope.group.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/groupProduit/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}



/***************************** CONTROLLEUR DE GESTION DES SOUS GROUP PRODUITS *****************************
 ***********************************************************************************************/

app.controller("paramSousGroup", paramSousGroup);

function paramSousGroup($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.sousgroup = {};
    };

   $http.get("/api/groupProduit/liste").then(function (response) {
            $scope.listegroups = response.data;
        });
  

    $scope.verifier = 0;
    $scope.sousgroup = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/sousGroup/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.sousgroup.id = null;
 			$scope.sousgroup.libelle = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
  $scope.OnChange();
    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/sousGroup/save", $scope.sousgroup).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du sous group " + " " + $scope.sousgroup.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
				 $scope.verifiers = response.data;
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite" + $scope.verifiers+ " " +"",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/sousGroup/edite/" + id).then(function (response) {
            $scope.sousgroup = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function (id) {
        $http.post("/api/sousGroup/save", $scope.sousgroup).then(
            function (response) {
              
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification  du sous group " + " " + $scope.sousgroup.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/sousGroup/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}

/***************************** CONTROLLEUR DE GESTION DES typePieceS*****************************
 ***********************************************************************************************/

app.controller("paramtypePiece", paramtypePiece);

function paramtypePiece($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.typePiece = {};
    };

    $scope.verifier = 0;
    $scope.typePiece = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/typePiece/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.typePiece = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/typePiece/save", $scope.typePiece).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du typePiece " + " " + $scope.typePiece.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/typePiece/edite/" + id).then(function (response) {
            $scope.typePiece = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function () {
        $http.post("/api/typePiece/save", $scope.typePiece).then(
            function (response) {
                
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du typePiece" + " " + $scope.typePiece.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/typePiece/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}




/***************************** CONTROLLEUR DE GESTION DES JOURNALS*****************************
 ***********************************************************************************************/

app.controller("paramJournale", paramJournale);

function paramJournale($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.journal = {};
    };

    $scope.verifier = 0;
    $scope.journal = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/journal/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.journal = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/journal/save", $scope.journal).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du journal " + " " + $scope.journal.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/journal/edite/" + id).then(function (response) {
            $scope.journal = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function () {
        $http.post("/api/journal/save", $scope.journal).then(
            function (response) {
                
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du journal" + " " + $scope.journal.libelle + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/journal/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}




/***************************** CONTROLLEUR DE GESTION DU PLAN *****************************
 ***********************************************************************************************/

app.controller("paramPlans", paramPlans);

function paramPlans($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.plans = {};
    };

   $scope.OuvrirSousClasse = function () {
        $scope.appercusousclasse = 1;
		$scope.appersubdivison = 0;
		$scope.appersouscompte = 0;
		$scope.apperclasse = 0;
		$scope.appercompte = 0;
	    $scope.subdivision= {};
	    $scope.classe = {};
	 	$scope.sousClasse = {};
    };

  $scope.OuvrirClasse = function () {
        $scope.appercusousclasse = 0;
		$scope.appersubdivison = 0;
		$scope.appersouscompte = 0;
		$scope.apperclasse = 1;
		$scope.appercompte = 0;
        $scope.subdivision= {};
	    $scope.classe = {};
	 	$scope.sousClasse = {};
    };

   $scope.OuvrirSubdivisin = function () {
        $scope.appersubdivison = 1;
		$scope.apperclasse = 0;
		$scope.appercusousclasse = 0;
		$scope.appersouscompte = 0;
		$scope.appercompte = 0;
	    $scope.subdivision= {};
	    $scope.classe = {};
	 	$scope.sousClasse = {};
    };

    $scope.OuvrirCompte = function () {
	    $scope.appercompte = 1;
  		$scope.appersouscompte = 0;
        $scope.appersubdivison = 0;
		$scope.apperclasse = 0;
		$scope.appercusousclasse = 0;
		
	    $scope.subdivision= {};
	    $scope.classe = {};
	 	$scope.sousClasse = {};
    };

    $scope.OuvrirSousCompte = function () {
	    $scope.appersouscompte = 1;
 		$scope.appercompte = 0;
        $scope.appersubdivison = 0;
		$scope.apperclasse = 0;
		$scope.appercusousclasse = 0;
		
	    $scope.subdivision= {};
	    $scope.classe = {};
	 	$scope.sousClasse = {};
	    $scope.sousCompte= {};
    };

   $http.get("/api/classe/liste").then(function (response) {
            $scope.listeclasses = response.data;
    });
  
   $http.get("/api/sousClasse/liste").then(function (response) {
            $scope.listesousclasses = response.data;
    });

  $scope.OnSousClasses = function (id) {
        $http.get("/api/sousClasse/liste/classe/" + id).then(function (response) {
            $scope.findsousclasses = response.data;
        });
    };

  $scope.OnSubdivision = function (id) {
        $http.get("/api/subdivision/liste/sousClasse/" + id).then(function (response) {
            $scope.findsubdivision= response.data;
        });
    };



    $scope.apperclasse = 1;
	$scope.appercompte = 0;
	$scope.appercusousclasse = 0;
	$scope.appersubdivison = 0;
    $scope.verifier = 0;
    $scope.classe = {};
 	$scope.sousClasse = {};
	
 	$scope.subdivision = {};
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/classe/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.classe = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
  $scope.OnChange();
    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.post("/api/classe/save", $scope.classe).then(
            function (response) {
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement de la classe  " + " " + $scope.classe.code + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
				 $scope.verifiers = response.data;
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEdite = function (id) {
        $http.get("/api/classe/edite/" + id).then(function (response) {
            $scope.classe = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdate = function (id) {
        $http.post("/api/classe/save", $scope.classe).then(
            function (response) {
              
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification de la classe " + " " + $scope.classe.code + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/classe/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };



	/***************************** PARTIE SOUS CLASSE *****************************
    ***********************************************************************************************/

	$scope.users1;

    $scope.OnChangeSousClasse = function () {
        $http.get("/api/sousClasse/liste/classe/" +$scope.sousClasse.classe.id).then(function (response) {
            $scope.users1 = response.data;
            $scope.usersTable1 = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data1 = params.sorting() ? $filter("orderBy")($scope.users1, params.orderBy()) : $scope.users1;
                        $scope.data1 = params.filter() ? $filter("filter")($scope.data1, params.filter()) : $scope.data1;
                        $scope.data1 = $scope.data1.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.sousClasse.id = null;
            $scope.sousClasse.code = null;
			$scope.sousClasse.libelle = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
 
    // Methode pour pour effectuer un enregistrement
    $scope.OnSaveSousClasse = function () {
        $http.post("/api/sousClasse/save", $scope.sousClasse).then(
            function (response) {
                $scope.OnChangeSousClasse();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement de la sous classe  " + " " + $scope.sousClasse.code + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
				
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite" ,
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEditeSousClasse = function (id) {
        $http.get("/api/sousClasse/edite/" + id).then(function (response) {
            $scope.sousClasse = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdateSousClasse = function (id) {
        $http.post("/api/sousClasse/save", $scope.sousClasse).then(
            function (response) {
              
                $scope.OnChangeSousClasse();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification de la sous classe " + " " + $scope.sousClasse.code + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDeleteSousClasse = function (id) {
        $http.delete("/api/sousClasse/delete/" + id).then(function (response) {
            $scope.OnChangeSousClasse();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirmSousClasse = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDeleteSousClasse(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };





	/***************************** PARTIE SUBDIVISION DE COMPTE *****************************
    ***********************************************************************************************/

	$scope.users2;

    $scope.OnChangeSubdivision = function () {
        $http.get("/api/subdivision/liste/sousClasse/" +$scope.subdivision.sousClasse.id).then(function (response) {
            $scope.users2 = response.data;
            $scope.usersTable2 = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data2 = params.sorting() ? $filter("orderBy")($scope.users2, params.orderBy()) : $scope.users2;
                        $scope.data2 = params.filter() ? $filter("filter")($scope.data2, params.filter()) : $scope.data2;
                        $scope.data2 = $scope.data2.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.subdivision.id = null;
			$scope.subdivision.libelle = null;
			$scope.subdivision.index = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
 
    // Methode pour pour effectuer un enregistrement
    $scope.OnSaveSubdivision  = function () {
        $http.post("/api/subdivision/save", $scope.subdivision).then(
            function (response) {
                $scope.OnChangeSubdivision ();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement de la subdivision  " + " " + $scope.subdivision.code + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
				
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite" ,
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEditeSubdivision  = function (id) {
        $http.get("/api/subdivision/edite/" + id).then(function (response) {
            $scope.subdivision = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdateSubdivision = function (id) {
        $http.post("/api/subdivision/save", $scope.subdivision).then(
            function (response) {
              
                $scope.OnChangeSubdivision();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification de la subdivision" + " " + $scope.subdivision.code + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDeleteSousClasse = function (id) {
        $http.delete("/api/subdivision/delete/" + id).then(function (response) {
            $scope.OnChangeSubdivision ();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirmSubdivision  = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDeleteSubdivision (id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };




	/***************************** PARTIE SOUS COMPTE REEL *****************************
    ***********************************************************************************************/

	$scope.users3;
    $scope.compte = {};

    $scope.OnChangeCompte = function () {
        $http.get("/api/compte/liste/subdivision/" +$scope.compte.subdivision.id).then(function (response) {
            $scope.users3 = response.data;
            $scope.usersTable3 = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data3 = params.sorting() ? $filter("orderBy")($scope.users3, params.orderBy()) : $scope.users3;
                        $scope.data3 = params.filter() ? $filter("filter")($scope.data3, params.filter()) : $scope.data3;
                        $scope.data3 = $scope.data3.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.compte.id = null;
            $scope.compte.code = null;
			$scope.compte.libelle = null;
			$scope.compte.index = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
 
    // Methode pour pour effectuer un enregistrement
    $scope.OnSaveCompte= function () {
        $http.post("/api/compte/save", $scope.compte).then(
            function (response) {
                $scope.OnChangeCompte();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du compte  " + " " + $scope.compte.code + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
				
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite" ,
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEditeCompte = function (id) {
        $http.get("/api/compte/edite/" + id).then(function (response) {
            $scope.compte = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdateCompte= function (id) {
        $http.post("/api/compte/save", $scope.compte).then(
            function (response) {
              
                $scope.OnChangeCompte();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du compte " + " " + $scope.compte.code + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDeleteCompte = function (id) {
        $http.delete("/api/compte/delete/" + id).then(function (response) {
            $scope.OnChangeCompte();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirmCompte = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDeleteCompte(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };




	/***************************** PARTIE SOUS COMPTE REEL II *****************************
    ***********************************************************************************************/

	$scope.users4;
    $scope.souscompte = {};


	  $scope.OnChangeCompte2 = function () {
	        $http.get("/api/compte/liste/subdivision/" +$scope.souscompte.subdivision.id).then(function (response) {
	            $scope.findcomptesreels = response.data;
	        });
	    };

    $scope.OnChangeSousCompte2 = function () {
        $http.get("/api/souscompte/liste").then(function (response) {
            $scope.users4 = response.data;
            $scope.usersTable4 = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data4 = params.sorting() ? $filter("orderBy")($scope.users4, params.orderBy()) : $scope.users4;
                        $scope.data4 = params.filter() ? $filter("filter")($scope.data4, params.filter()) : $scope.data4;
                        $scope.data4 = $scope.data4.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.souscompte.id = null;
            $scope.souscompte.code = null;
			$scope.souscompte.libelle = null;
			$scope.souscompte.index = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
 
 	$scope.OnChangeSousCompte2();


    // Methode pour pour effectuer un enregistrement
    $scope.OnSaveSousCompte = function () {
        $http.post("/api/souscompte/save", $scope.souscompte).then(
            function (response) {
                $scope.OnChangeSousCompte2();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du Sous Compte  " + " " + $scope.souscompte.numeroCompte + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
				
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite" ,
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une edition
    $scope.OnEditeSousCompte = function (id) {
        $http.get("/api/souscompte/edite/" + id).then(function (response) {
            $scope.souscompte = response.data;
            $scope.verifier = 1;
        });
    };

    // Methode pour effectuer une modification
    $scope.OnUpdateSousCompte= function (id) {
        $http.post("/api/compte/save", $scope.souscompte).then(
            function (response) {
              
                $scope.OnChangeSousCompte2();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Modification du sous compte " + " " + $scope.souscompte.code + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDeleteSousCompte = function (id) {
        $http.delete("/api/souscompte/delete/" + id).then(function (response) {
            $scope.OnChangeSousCompte2();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirmCompte = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDeleteSousCompte(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };












}




/***************************** CONTROLLEUR DE GESTION COMMERCIAL *****************************
 ***********************************************************************************************/

app.controller("paramCommercial", paramCommercial);

function paramCommercial($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
   
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.proforma = {};
    };
  
 	$scope.proforma = {};
	$scope.detailproforma = {};
    $scope.swithproformat = 0;

    $scope.afficherProformat = function () 
	{
        $scope.swithproformat = 1;

    };

    $scope.fermerProformat = function () 
    {
        $scope.swithproformat = 0;
 		$scope.proformaRecuperer = null;
	 	$scope.detailproforma = null;
    };   

	$http.get("/api/stock/liste/magasin").then(function (response) {
            $scope.findscrussalemagasins = response.data;
    });

	$scope.OnGetArticle = function () {
        $http.get("/api/stock/liste/scrussale/"+ $scope.magasinID).then(function (response) {
            $scope.listeStocks = response.data;
        });
    };

    $scope.afficherDescription= function () 
	{
	  $http.get("/api/stock/edite/"+ $scope.article).then(function (response) {
            $scope.detailproforma.description = response.data.article.description;
 			$scope.detailproforma.prixUnitaire = response.data.article.prixUnitaire;
		    $scope.OnVideByArticle();
        });
	}


	//*******************OPERATION SUR LES PROFORMAS ***********************************//
	
	$scope.checkAll = function () {
        $scope.user.data = angular.copy($scope.users);
    };

    $scope.uncheckAll = function () {
        $scope.user.data = [];
    };

    $scope.generateVente = function () 
    {
        if ($scope.user.data != null) 
		{
            for (i = 0; i < $scope.user.data.length; i++) {
                $http.get("/api/vente/generate/" + $scope.user.data[i].id).then(function (response) {
                   $scope.OnChange();

						if( response.data == false )
						{
							
							 new PNotify({
			                    title: "GESCCOM-WEB Validation",
			                    text: "Cette Vente a été déja générer",
			                    type: "warning",
			                    styling: "bootstrap3",
			                    delay: 3000,
			                    history: false,
			                    sticker: true,
			                });
						}
						else
						{
							 new PNotify({
			                    title: "GESCCOM-WEB Validation",
			                    text: "Génération du proforma éffectuer avec succes",
			                    type: "info",
			                    styling: "bootstrap3",
			                    delay: 3000,
			                    history: false,
			                    sticker: true,
			                });
			
					   }

                });
            }

        } 
        else {
           new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Veillez selectioner une proforma pour effectuer la génération",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
        }
     };


 	
    $scope.showConfirmGenerate = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir générer la facture pour cet proforma,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.generateVente(id);
            
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de génération annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };


    $http.get("/api/client/liste/scrussale").then(function (response) {
            $scope.findclients = response.data;
    });

    
    $scope.OnSaveProforma = function () 
	{
        $http.post("/api/proforma/save", $scope.proforma).then(
            function (response) {
			    $scope.proformaRecuperer = response.data;
				$scope.proformaRecuperer.dateProforma = new Date($scope.proformaRecuperer.dateProforma);
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement de la Proforma éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
				 $scope.afficherProformat();
			 	
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

   $scope.OnGetProforma = function (id) {
        $http.get("/api/proforma/edite/" + id).then(function (response) {
           $scope.proformaRecuperer = response.data;
		   $scope.proformaRecuperer.dateProforma = new Date($scope.proformaRecuperer.dateProforma);
		   $scope.afficherProformat();
		   $scope.OnChangeDetails();
        });
    };

//*******************OPERATION SUR LES DETAILS DE PROFORMA ***********************************//

				//recuperer la tva du scrussale
   $http.get("/api/parametreTVA/getTVA").then(function (response) {
	  $scope.tauxTVA = response.data;
   })
			
   $scope.OnCalculMontantHT = function () 
   {
	
      $scope.detailproforma.montantHT =  $scope.detailproforma.prixUnitaire *  $scope.detailproforma.quantite;
 	  $scope.OnCalculMontantRemise();
 	  $scope.OnCalculMontantTVA();

   };


   $scope.OnCalculMontantRemise = function () 
   {
		if( $scope.detailproforma.remise == undefined)
		{
			$scope.detailproforma.montantRemise =  $scope.detailproforma.montantHT;
		}
		else
		{
		   $scope.detailproforma.montantRemise =  $scope.detailproforma.montantHT - $scope.detailproforma.remise;
 		}
   };


   $scope.OnCalculMontantTVA = function () 
   {
	
		if( $scope.actionTVA == false)
		{
			$scope.detailproforma.montantTVA = 0;
		}
		else
		{
		    $scope.detailproforma.montantTVA =  ($scope.detailproforma.montantRemise * $scope.tauxTVA) / 100;
 		}
		$scope.OnCalculMontantTTC();
   };

   $scope.OnCalculMontantTTC= function () 
   {
	 $scope.detailproforma.montantTTC = $scope.detailproforma.montantTVA + $scope.detailproforma.montantRemise ;
   };


   $scope.OnVideDetailProforma= function () 
   {
	 $scope.detailproforma.id = null;
	 $scope.detailproforma.montantHT = 0;
	 $scope.article = null;
	 $scope.detailproforma.description = null;
 	 $scope.detailproforma.quantite = 0;
 	 $scope.detailproforma.prixUnitaire = 0;
	 $scope.detailproforma.remise = 0;
	 $scope.detailproforma.montantRemise =  0;
	 $scope.detailproforma.montantTVA =  0;
	 $scope.detailproforma.montantTTC =  0;
   };

   $scope.OnVideByArticle= function () 
   {
	 
	 $scope.detailproforma.montantHT = 0;
 	 $scope.detailproforma.quantite = 0;
	 $scope.detailproforma.remise = 0;
	 $scope.detailproforma.montantRemise =  0;
	 $scope.detailproforma.montantTVA =  0;
	 $scope.detailproforma.montantTTC =  0;
   };

   $scope.OnSaveDetailProforma = function () 
   {
        $http.post("/api/detailProforma/save/"+$scope.actionTVA+"/"+ $scope.proformaRecuperer.id+"/"+$scope.article, $scope.detailproforma).then(
            function (response) {
                $scope.OnChangeDetails();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement de la Proforma",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
				
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    $scope.verifier = 0;
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/proforma/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );
			
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

	$scope.OnSavePanier = function () 
    {
        $http.post("/api/proforma/update", $scope.proformaRecuperer).then(
            function (response) {
                
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Validation du Proforma effectuer avec succes ",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
				$scope.OnChange();
				//$scope.fermerProformat();
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    $scope.OnChangeDetails = function () 
    {
        $http.get("/api/detailProforma/liste/"+$scope.proformaRecuperer.id).then(function (response) {
           
			$scope.users1 = response.data;
            $scope.usersTable1 = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users1.length,
                    getData: function (params) {
                        $scope.data1 = params.sorting() ? $filter("orderBy")($scope.users1, params.orderBy()) : $scope.users1;
                        $scope.data1 = params.filter() ? $filter("filter")($scope.data1, params.filter()) : $scope.data1;
                        $scope.data1 = $scope.data1.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data1;
                    },
                }
            );

            $scope.OnVideDetailProforma();
			$scope.OnCalculEcrans();
            $scope.verifier = 0;
            $scope.user.data = null;
        });
     };
    
    // Methode pour effectuer les calcules des totaux Ecran

    $scope.OnCalculEcrans = function () 
    {
        $scope.OnCalculHT();
		$scope.OnCalculRemise();
		$scope.OnCalculAferRemise();
		$scope.OnCalculTVA();
		$scope.OnCalculTTC();
    }

    $scope.OnCalculHT = function () 
    {
        $http.get("/api/detailProforma/calculHT/" + $scope.proformaRecuperer.id).then(function (response) {
            $scope.proformaRecuperer.montantHT = response.data;
        });
    };

    $scope.OnCalculRemise = function () 
    {
        $http.get("/api/detailProforma/calculRemise/" + $scope.proformaRecuperer.id).then(function (response) {
            $scope.proformaRecuperer.remise = response.data;
        });
    };

    $scope.OnCalculAferRemise = function () 
    {
        $http.get("/api/detailProforma/calculTOTALREMISE/" + $scope.proformaRecuperer.id).then(function (response) {
            $scope.proformaRecuperer.montantRemise = response.data;
        });
    };

    $scope.OnCalculTVA = function () 
    {
        $http.get("/api/detailProforma/calculTVA/" + $scope.proformaRecuperer.id).then(function (response) {
            $scope.proformaRecuperer.montantTVA = response.data;
        });
    };

    $scope.OnCalculTTC = function () 
    {
        $http.get("/api/detailProforma/calculTTC/" + $scope.proformaRecuperer.id).then(function (response) {
            $scope.proformaRecuperer.montantTTC = response.data;
        });
    };


    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/detailProforma/delete/" + id).then(function (response) {
            $scope.OnChangeDetails();
        });
    };

 	$scope.OnDeleteProforma = function (id) {
        $http.delete("/api/proforma/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    $scope.showConfirmProforma = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDeleteProforma(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}

/***************************** CONTROLLEUR DE GESTION DES PRESTATIONS *****************************
 ***********************************************************************************************/

app.controller("paramPrestation", paramPrestation);

function paramPrestation($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
   
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.proforma = {};
    };
  
 	$scope.proforma = {};
	$scope.detailproforma = {};
    $scope.swithproformat = 0;

    $scope.afficherProformat = function () 
	{
        $scope.swithproformat = 1;

    };

    $scope.fermerProformat = function () 
    {
        $scope.swithproformat = 0;
 		$scope.proformaRecuperer = null;
	 	$scope.detailproforma = null;
    };   

	

	$http.get("/api/typePrestation/liste").then(function (response) {
            $scope.findTypePrestations = response.data;
    });



    $scope.afficherDescription= function () 
	{
	  $http.get("/api/stock/edite/"+ $scope.article).then(function (response) {
            $scope.detailproforma.description = response.data.article.description;
 			$scope.detailproforma.prixUnitaire = response.data.article.prixUnitaire;
		    $scope.OnVideByArticle();
        });
	}


	//*******************OPERATION SUR LES DETAAILS ***********************************//
	
	$scope.checkAll = function () {
        $scope.user.data = angular.copy($scope.users);
    };

    $scope.uncheckAll = function () {
        $scope.user.data = [];
    };

	$scope.generateEcriture = function () 
    {
        if ($scope.user.data != null) 
		{
            for (i = 0; i < $scope.user.data.length; i++) {
                $http.get("/api/prestation/generate/ecriture/" + $scope.user.data[i].id).then(function (response) {
                   $scope.OnChange();

						if( response.data == false )
						{
							
							 new PNotify({
			                    title: "GESCCOM-WEB Validation",
			                    text: "Cette écriture à été déja générée",
			                    type: "warning",
			                    styling: "bootstrap3",
			                    delay: 3000,
			                    history: false,
			                    sticker: true,
			                });
						}
						else
						{
							 new PNotify({
			                    title: "GESCCOM-WEB Validation",
			                    text: "Génération de l\'ecriture Comptable éffectuer avec succes",
			                    type: "success",
			                    styling: "bootstrap3",
			                    delay: 3000,
			                    history: false,
			                    sticker: true,
			                });
			
					   }

                });
            }

        } 
        else {
           new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Veillez selectioner une facture vente pour effectuer la génération",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
        }
     };


 	
    $scope.showConfirmGenerate = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir générer l\'ecriture comptable pour cette prestation,")
            .textContent("Cette operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.generateEcriture(id);
            
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de génération annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };



    $http.get("/api/client/liste/scrussale").then(function (response) {
            $scope.findclients = response.data;
    });

    
    $scope.OnSaveProforma = function () 
	{
        $http.post("/api/prestation/save", $scope.proforma).then(
            function (response) {
			    $scope.proformaRecuperer = response.data;
				$scope.proformaRecuperer.dateProforma = new Date($scope.proformaRecuperer.dateProforma);
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement de la Proforma éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
				 $scope.afficherProformat();
			 	
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

   $scope.OnGetProforma = function (id) {
        $http.get("/api/prestation/edite/" + id).then(function (response) {
           $scope.proformaRecuperer = response.data;
		   $scope.proformaRecuperer.dateProforma = new Date($scope.proformaRecuperer.dateProforma);
		   $scope.afficherProformat();
		   $scope.OnChangeDetails();
        });
    };

//*******************OPERATION SUR LES DETAILS DE PROFORMA ***********************************//

				//recuperer la tva du scrussale
   $http.get("/api/parametreTVA/getTVA").then(function (response) {
	  $scope.tauxTVA = response.data;
   })
			
   $scope.OnCalculMontantHT = function () 
   {
	
      $scope.detailproforma.montantHT =  $scope.detailproforma.prixUnitaire *  $scope.detailproforma.quantite;
 	  $scope.OnCalculMontantRemise();
 	  $scope.OnCalculMontantTVA();

   };


   $scope.OnCalculMontantRemise = function () 
   {
		if( $scope.detailproforma.remise == undefined)
		{
			$scope.detailproforma.montantRemise =  $scope.detailproforma.montantHT;
		}
		else
		{
		   $scope.detailproforma.montantRemise =  $scope.detailproforma.montantHT - $scope.detailproforma.remise;
 		}
   };


   $scope.OnCalculMontantTVA = function () 
   {
	
		if( $scope.actionTVA == false)
		{
			$scope.detailproforma.montantTVA = 0;
		}
		else
		{
		    $scope.detailproforma.montantTVA =  ($scope.detailproforma.montantRemise * $scope.tauxTVA) / 100;
 		}
		$scope.OnCalculMontantTTC();
   };

   $scope.OnCalculMontantTTC= function () 
   {
	 $scope.detailproforma.montantTTC = $scope.detailproforma.montantTVA + $scope.detailproforma.montantRemise ;
   };


   $scope.OnVideDetailProforma= function () 
   {
	 $scope.detailproforma.id = null;
	 $scope.detailproforma.montantHT = 0;
	 $scope.article = null;
	 $scope.detailproforma.description = null;
 	 $scope.detailproforma.quantite = 0;
 	 $scope.detailproforma.prixUnitaire = 0;
	 $scope.detailproforma.remise = 0;
	 $scope.detailproforma.montantRemise =  0;
	 $scope.detailproforma.montantTVA =  0;
	 $scope.detailproforma.montantTTC =  0;
   };

   $scope.OnVideByArticle= function () 
   {
	 
	 $scope.detailproforma.montantHT = 0;
 	 $scope.detailproforma.quantite = 0;
	 $scope.detailproforma.remise = 0;
	 $scope.detailproforma.montantRemise =  0;
	 $scope.detailproforma.montantTVA =  0;
	 $scope.detailproforma.montantTTC =  0;
   };

   $scope.OnSaveDetailProforma = function () 
   {
        $http.post("/api/detailPrestation/save/"+$scope.actionTVA+"/"+ $scope.proformaRecuperer.id, $scope.detailproforma).then(
            function (response) {
                $scope.OnChangeDetails();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement de la Proforma",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
				
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    $scope.verifier = 0;
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/prestation/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );
			
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

	$scope.OnSavePanier = function () 
    {
        $http.post("/api/prestation/update", $scope.proformaRecuperer).then(
            function (response) {
                
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Merci d\'avoir edite la prestation ",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
				$scope.OnChange();
				$scope.fermerProformat();
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    $scope.OnChangeDetails = function () 
    {
        $http.get("/api/detailPrestation/liste/"+$scope.proformaRecuperer.id).then(function (response) {
           
			$scope.users1 = response.data;
            $scope.usersTable1 = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users1.length,
                    getData: function (params) {
                        $scope.data1 = params.sorting() ? $filter("orderBy")($scope.users1, params.orderBy()) : $scope.users1;
                        $scope.data1 = params.filter() ? $filter("filter")($scope.data1, params.filter()) : $scope.data1;
                        $scope.data1 = $scope.data1.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data1;
                    },
                }
            );

            $scope.OnVideDetailProforma();
			$scope.OnCalculEcrans();
            $scope.verifier = 0;
            $scope.user.data = null;
        });
     };
    
    // Methode pour effectuer les calcules des totaux Ecran

    $scope.OnCalculEcrans = function () 
    {
        $scope.OnCalculHT();
		$scope.OnCalculRemise();
		$scope.OnCalculAferRemise();
		$scope.OnCalculTVA();
		$scope.OnCalculTTC();
    }

    $scope.OnCalculHT = function () 
    {
        $http.get("/api/detailPrestation/calculHT/" + $scope.proformaRecuperer.id).then(function (response) {
            $scope.proformaRecuperer.montantHT = response.data;
        });
    };

    $scope.OnCalculRemise = function () 
    {
        $http.get("/api/detailPrestation/calculRemise/" + $scope.proformaRecuperer.id).then(function (response) {
            $scope.proformaRecuperer.remise = response.data;
        });
    };

    $scope.OnCalculAferRemise = function () 
    {
        $http.get("/api/detailPrestation/calculTOTALREMISE/" + $scope.proformaRecuperer.id).then(function (response) {
            $scope.proformaRecuperer.montantRemise = response.data;
        });
    };

    $scope.OnCalculTVA = function () 
    {
        $http.get("/api/detailPrestation/calculTVA/" + $scope.proformaRecuperer.id).then(function (response) {
            $scope.proformaRecuperer.montantTVA = response.data;
        });
    };

    $scope.OnCalculTTC = function () 
    {
        $http.get("/api/detailPrestation/calculTTC/" + $scope.proformaRecuperer.id).then(function (response) {
            $scope.proformaRecuperer.montantTTC = response.data;
        });
    };


    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/detailPrestation/delete/" + id).then(function (response) {
            $scope.OnChangeDetails();
        });
    };

 	$scope.OnDeleteProforma = function (id) {
        $http.delete("/api/prestation/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    $scope.showConfirmProforma = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDeleteProforma(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}


















/***************************** CONTROLLEUR DE GESTION VENTES *****************************
 ***********************************************************************************************/

app.controller("paramVente", paramVente);

function paramVente($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
   
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.proforma = {};
    };
  
 	$scope.proforma = {};
	$scope.detailproforma = {};
    $scope.swithproformat = 0;

    $scope.afficherProformat = function () 
	{
        $scope.swithproformat = 1;

    };

    $scope.fermerProformat = function () 
    {
        $scope.swithproformat = 0;
 		$scope.proformaRecuperer = null;
	 	$scope.detailproforma = null;
    };   

	$http.get("/api/stock/liste/magasin").then(function (response) {
            $scope.findscrussalemagasins = response.data;
    });

	$scope.OnGetArticle = function () {
        $http.get("/api/stock/liste/scrussale/"+ $scope.magasinID).then(function (response) {
            $scope.listeStocks = response.data;
        });
    };

    $scope.afficherDescription= function () 
	{
	  $http.get("/api/stock/edite/"+ $scope.article).then(function (response) {
            $scope.detailproforma.description = response.data.article.description;
 			$scope.detailproforma.prixUnitaire = response.data.article.prixUnitaire;
		    $scope.OnVideByArticle();
        });
	}


	//*******************OPERATION SUR LES PROFORMAS ***********************************//
	
	$scope.checkAll = function () {
        $scope.user.data = angular.copy($scope.users);
    };

    $scope.uncheckAll = function () {
        $scope.user.data = [];
    };

$scope.generateEcriture = function () 
    {
        if ($scope.user.data != null) 
		{
            for (i = 0; i < $scope.user.data.length; i++) {
                $http.get("/api/vente/generate/ecriture/" + $scope.user.data[i].id).then(function (response) {
                   $scope.OnChange();

						if( response.data == false )
						{
							
							 new PNotify({
			                    title: "GESCCOM-WEB Validation",
			                    text: "Cette écriture à été déja générée",
			                    type: "warning",
			                    styling: "bootstrap3",
			                    delay: 3000,
			                    history: false,
			                    sticker: true,
			                });
						}
						else
						{
							 new PNotify({
			                    title: "GESCCOM-WEB Validation",
			                    text: "Génération de l\'ecriture Comptable éffectuer avec succes",
			                    type: "success",
			                    styling: "bootstrap3",
			                    delay: 3000,
			                    history: false,
			                    sticker: true,
			                });
			
					   }

                });
            }

        } 
        else {
           new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Veillez selectioner une facture vente pour effectuer la génération",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
        }
     };


 	
    $scope.showConfirmGenerate = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir générer l\'ecriture comptable pour cette vente,")
            .textContent("Cette operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.generateEcriture(id);
            
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de génération annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };




    $http.get("/api/client/liste/scrussale").then(function (response) {
            $scope.findclients = response.data;
    });

    
    $scope.OnSaveProforma = function () 
	{
        $http.post("/api/vente/save", $scope.proforma).then(
            function (response) {
			    $scope.proformaRecuperer = response.data;
				$scope.proformaRecuperer.dateVente = new Date($scope.proformaRecuperer.dateVente);
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement de la Proforma éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
				 $scope.afficherProformat();
			 	
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

   $scope.OnGetProforma = function (id) {
        $http.get("/api/vente/edite/" + id).then(function (response) {
           $scope.proformaRecuperer = response.data;
		   $scope.proformaRecuperer.dateVente = new Date($scope.proformaRecuperer.dateVente);
		   $scope.afficherProformat();
		   $scope.OnChangeDetails();
        });
    };

//*******************OPERATION SUR LES DETAILS DE PROFORMA ***********************************//

				//recuperer la tva du scrussale
   $http.get("/api/parametreTVA/getTVA").then(function (response) {
	  $scope.tauxTVA = response.data;
   })
			
   $scope.OnCalculMontantHT = function () 
   {
	
      $scope.detailproforma.montantHT =  $scope.detailproforma.prixUnitaire *  $scope.detailproforma.quantite;
 	  $scope.OnCalculMontantRemise();
 	  $scope.OnCalculMontantTVA();

   };


   $scope.OnCalculMontantRemise = function () 
   {
		if( $scope.detailproforma.remise == undefined)
		{
			$scope.detailproforma.montantRemise =  $scope.detailproforma.montantHT;
		}
		else
		{
		   $scope.detailproforma.montantRemise =  $scope.detailproforma.montantHT - $scope.detailproforma.remise;
 		}
   };


   $scope.OnCalculMontantTVA = function () 
   {
	
		if( $scope.actionTVA == false)
		{
			$scope.detailproforma.montantTVA = 0;
		}
		else
		{
		    $scope.detailproforma.montantTVA =  ($scope.detailproforma.montantRemise * $scope.tauxTVA) / 100;
 		}
		$scope.OnCalculMontantTTC();
   };

   $scope.OnCalculMontantTTC= function () 
   {
	 $scope.detailproforma.montantTTC = $scope.detailproforma.montantTVA + $scope.detailproforma.montantRemise ;
   };


   $scope.OnVideDetailProforma= function () 
   {
	 $scope.detailproforma.id = null;
	 $scope.detailproforma.montantHT = 0;
	 $scope.article = null;
	 $scope.detailproforma.description = null;
 	 $scope.detailproforma.quantite = 0;
 	 $scope.detailproforma.prixUnitaire = 0;
	 $scope.detailproforma.remise = 0;
	 $scope.detailproforma.montantRemise =  0;
	 $scope.detailproforma.montantTVA =  0;
	 $scope.detailproforma.montantTTC =  0;
   };

   $scope.OnVideByArticle= function () 
   {
	 
	 $scope.detailproforma.montantHT = 0;
 	 $scope.detailproforma.quantite = 0;
	 $scope.detailproforma.remise = 0;
	 $scope.detailproforma.montantRemise =  0;
	 $scope.detailproforma.montantTVA =  0;
	 $scope.detailproforma.montantTTC =  0;
   };

   $scope.OnSaveDetailProforma = function () 
   {
        $http.post("/api/panier/save/"+$scope.actionTVA+"/"+ $scope.proformaRecuperer.id+"/"+$scope.article, $scope.detailproforma).then(
            function (response) {
                $scope.OnChangeDetails();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement de la vente  ",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
				
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    $scope.verifier = 0;
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/vente/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );
			
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

	$scope.OnSavePanier = function () 
    {
        $http.post("/api/vente/update", $scope.proformaRecuperer).then(
            function (response) {
                
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Merci d\'avoir edite la proforma ",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
				$scope.OnChange();
				$scope.fermerProformat();
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    $scope.OnChangeDetails = function () 
    {
        $http.get("/api/panier/liste/"+$scope.proformaRecuperer.id).then(function (response) {
           
			$scope.users1 = response.data;
            $scope.usersTable1 = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users1.length,
                    getData: function (params) {
                        $scope.data1 = params.sorting() ? $filter("orderBy")($scope.users1, params.orderBy()) : $scope.users1;
                        $scope.data1 = params.filter() ? $filter("filter")($scope.data1, params.filter()) : $scope.data1;
                        $scope.data1 = $scope.data1.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data1;
                    },
                }
            );

            $scope.OnVideDetailProforma();
			$scope.OnCalculEcrans();
            $scope.verifier = 0;
            $scope.user.data = null;
        });
     };
    
    // Methode pour effectuer les calcules des totaux Ecran

    $scope.OnCalculEcrans = function () 
    {
        $scope.OnCalculHT();
		$scope.OnCalculRemise();
		$scope.OnCalculAferRemise();
		$scope.OnCalculTVA();
		$scope.OnCalculTTC();
    }

    $scope.OnCalculHT = function () 
    {
        $http.get("/api/panier/calculHT/" + $scope.proformaRecuperer.id).then(function (response) {
            $scope.proformaRecuperer.montantHT = response.data;
        });
    };

    $scope.OnCalculRemise = function () 
    {
        $http.get("/api/detailProforma/calculRemise/" + $scope.proformaRecuperer.id).then(function (response) {
            $scope.proformaRecuperer.remise = response.data;
        });
    };

    $scope.OnCalculAferRemise = function () 
    {
        $http.get("/api/panier/calculTOTALREMISE/" + $scope.proformaRecuperer.id).then(function (response) {
            $scope.proformaRecuperer.montantRemise = response.data;
        });
    };

    $scope.OnCalculTVA = function () 
    {
        $http.get("/api/panier/calculTVA/" + $scope.proformaRecuperer.id).then(function (response) {
            $scope.proformaRecuperer.montantTVA = response.data;
        });
    };

    $scope.OnCalculTTC = function () 
    {
        $http.get("/api/panier/calculTTC/" + $scope.proformaRecuperer.id).then(function (response) {
            $scope.proformaRecuperer.montantTTC = response.data;
        });
    };


    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/panier/delete/" + id).then(function (response) {
            $scope.OnChangeDetails();
        });
    };

 	$scope.OnDeleteProforma = function (id) {
        $http.delete("/api/vente/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    $scope.showConfirmProforma = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDeleteProforma(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}




/***************************** CONTROLLEUR DE GESTION DES JOURNEE *****************************
 ***********************************************************************************************/

app.controller("paramJournee", paramJournee);

function paramJournee($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.journee = {};
    };

    $scope.verifier = 0;
    $scope.journee = {};
    $scope.users;

    //Methode pour verifier si une journée est active et si il existe une journee avec la date d'aujourdhui
    $scope.OnVerifyJournee = function () {
        $http.get("/Journee/verification").then(function (response) {
            $scope.desactivation = response.data;
        });
    };

    $scope.OnVerifyJournee();

    //Methode pour verifier si une journée est active
    $scope.OnActiveJournee = function () {
        $http.get("/Journee/oneactivedayverification").then(function (response) {
            $scope.activation = response.data;
        });
    };

    $scope.OnActiveJournee();

    $scope.OnChange = function () {
        $http.get("/Journee/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );
            $scope.journee = null;
            $scope.verifier = 0;
            $scope.user.data = null;
            $scope.OnVerifyJournee();
            $scope.OnActiveJournee();
        });
    };
    $scope.OnChange();

    // Methode pour pour effectuer un enregistrement
    $scope.OnSave = function () {
        $http.get("/Journee/save").then(
            function (response) {
                $scope.etat = response.data;
                $scope.OnChange();
                $scope.OnVerifyJournee();
                if (etat == true) {
                    new PNotify({
                        title: "GESCCOM-WEB Enregistrement",
                        text: "Enrégistrement de la journée éffectué",
                        type: "success",
                        styling: "bootstrap3",
                        delay: 3000,
                        history: false,
                        sticker: true,
                    });
                } else {
                    new PNotify({
                        title: "GESCCOM-WEB Enregistrement",
                        text: "Vous ne pouvez pas activer deux journées le même jour attendez demain pour en activé une autre",
                        type: "warning",
                        styling: "bootstrap3",
                        delay: 3000,
                        history: false,
                        sticker: true,
                    });
                }
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une fermeture de journee
    $scope.OnClose = function (id) {
        $http.get("/Journee/close/" + id).then(
            function (response) {
                $scope.journee = response.data;
                $scope.verifier = 1;
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Fermeture de la journee" + " " + $scope.journee.code + " " + " éffectué avec succès",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une activation de journee
    $scope.OnActive = function (id) {
        $http.get("/Journee/active/" + id).then(
            function (response) {
                $scope.journee = response.data;
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Modification",
                    text: "Activation de la journee" + " " + $scope.journee.code + " " + " éffectué avec succès",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/Journee/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode de notification pour la fermeture de journee
    $scope.showConfirm2 = function (event, id) {
        var confirm = $mdDialog.confirm().title("Etes-vous sur de vouloir desactiver cette journee,").textContent("Cet operation ne pourra plus être annuler").ariaLabel("GESCCOM-WEB Avertissement").targetEvent(event).ok("Oui").cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnClose(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Journée activé  avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };

    app.config(function ($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function (date) {
            return date ? moment(date).format("DD-MM-YYYY") : "";
        };

        $mdDateLocaleProvider.parseDate = function (dateString) {
            var m = moment(dateString, "DD-MM-YYYY", true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };
    });

    $scope.searchTerm;
    $scope.clearSearchTerm = function () {
        $scope.searchTerm = "";
    };

    $element.find("input").on("keydown", function (ev) {
        ev.stopPropagation();
    });

    $scope.myDate = new Date();

    $scope.minDate = new Date($scope.myDate.getFullYear() - 1, $scope.myDate.getMonth(), $scope.myDate.getDate());

    $scope.maxDate = new Date($scope.myDate.getFullYear() + 1, $scope.myDate.getMonth(), $scope.myDate.getDate());
}



app.controller("paramInventaire", paramInventaire);

function paramInventaire($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
   
 $scope.paramabsence = {};
    $scope.listeabsence = {};
    $scope.users;
    $scope.moisID;
    $scope.niveauID;
    
    
    $scope.init= function () {
    	
    	$scope.users=null;	
    	
    };

	$scope.appercue = 0;
   
	 $scope.fermerDetails  = function () {
		$scope.appercue = 0;	
		$scope.invenetaireRecuperer = 0;
	 };
		
    $scope.afficherDetails = function () {
    	
    	$scope.appercue = 1;	
    	
    };

    $scope.OnEditeInventaire = function (id) {
        $http.get("/api/inventaire/edite/" + id).then(function (response) {
            $scope.invenetaireRecuperer = response.data;
 			$scope.afficherDetails();
        });
    };
    
    $http.get("/api/stock/liste/magasin").then(function (response) {
        $scope.listemagasin = response.data;
    });
    
   $scope.genererdetails = function () 
   {
	     $http.get("/api/inventaire/generate/"+$scope.magazinID+"/"+$scope.invenetaireRecuperer.id)
	     .then(function (response) {
	    	if( response.data == false)
			{
				 $scope.chargerDetails();
			}
			else{
				new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Génération de la fiche d\'inventaire effectué",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
			}
	      },function errorCallback(response) {
	    	
			new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });

	        });
	   };
    
	$scope.inventaire ={};
    $scope.OnSave = function () {
        $http.post("/api/inventaire/save", $scope.inventaire).then(
            function (response) {
              
				$scope.inventaire = response.data;
                $scope.OnChange();
                $scope.afficherDetails();
                    new PNotify({
                        title: "GESCCOM-WEB Enregistrement",
                        text: "Enrégistrement de l\'inventaire éffectué",
                        type: "success",
                        styling: "bootstrap3",
                        delay: 3000,
                        history: false,
                        sticker: true,
                    });
                
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };


    $scope.OnChange = function () {
        $http.get("/api/inventaire/liste").then(function (response) {
            $scope.usersI = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.usersI.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.usersI, params.orderBy()) : $scope.usersI;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.user.data = null;
        });
    };
	$scope.OnChange();
	
    $scope.chargerDetails = function () {
        $http.get("/api/inventaire/listeDetails/"+$scope.magazinID+"/"+$scope.invenetaireRecuperer.id).then(function (response) {
               $scope.users = response.data;
           },function errorCallback(response) {
        	   $scope.users = null;	
           });
   };
 
     ///// integration de EDITTABLE
    // add user
	 $scope.addUser = function() {
		    $scope.users.push({
		      id: $scope.users.length+1,
		      name: '',
		      status: null,
		      group: null,
		      isNew: true
		    });
		  };

		  // cancel all changes
		  $scope.cancel = function() {
		    for (var i = $scope.users.length; i--;) {
		      var user = $scope.users[i];    
		      // undelete
		      if (user.isDeleted) {
		        delete user.isDeleted;
		      }
		      // remove new
		      if (user.isNew) {
		        $scope.users.splice(i, 1);
		      }      
		    };
		  };

		  
		  
		  
	     // /$scope.erreury=['text1','text2','text3'];
		  
		// $scope.erreury=[1,2,3,4];
		  
		  
		  
		  // save edits
		  $scope.saveTable = function() { 
    		    var results = [];
    		
    		var text;
    		 var typ=0;
    		    
    		 
    		    
    		// alert(typ);
    		    
    		    if (typ==0){
    		    
    		    for (var i = $scope.users.length; i--;) {
    		      var user = $scope.users[i];
    		      // actually delete user
    		      if (user.isDeleted) {
    		        $scope.users.splice(i, 1);
    		      }
    		      // mark as not new
    		      if (user.isNew) {
    		        user.isNew = false;
    		      }

    		      // send on server
    		     // alert(user.idAss)
    		      
    		      results.push($http.post('/api/inventaire/savedetails', user));     
    		        		      
    		    $scope.erreur=null;
    		    }                  
    		   
    		    return $q.all(results);
    		    
    		    
    		  };
    		  
    		  
    		   
    		  };
		  
		  
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.paramabsence= {};
    };

    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog.confirm().title("Etes-vous sur de vouloir supprimer cet enregistremnt,").textContent("Cet operation ne pourra plus être annuler").ariaLabel("UM Avertissement").targetEvent(event).ok("Oui").cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.supprimerparamabsencet(id);
 				new PNotify({
                    title: "Umanager Etudiant ",
                    text: "Enregistrement supprimer avec succès",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 2500,
                    history: false,
                    sticker: true,
                });
                $scope.status = "Enregistrement supprimer avec succès";
            },
            function () {
                $scope.status = "Opération annulée";
				new PNotify({
                    title: "Umanager Etudiant ",
                    text: "Opération de supression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 2500,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

     
}

/***************************** CONTROLLEUR DE GESTION DES STOCKS *****************************
 ***********************************************************************************************/

app.controller("paramStock", paramStock);

function paramStock($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.verifier = 0;
    //Variable pour afficher l'interface des entrees

    $scope.stock = {};
    $scope.users;

    $http.get("/api/sousGroup/liste").then(function (response) {
        $scope.listesousgroup = response.data;
    });

    $http.get("/api/scrussale/liste").then(function (response) {
        $scope.listescrussales = response.data;
    });

   $scope.OnChangeMagasin = function () {
        $http.get("/api/magasin/liste/scrussale/" +  $scope.stock.scrussale.id).then(function (response) {
            $scope.listemagasins = response.data;
        });
    };

   $http.get("/api/stock/liste/magasin").then(function (response) 
   {
        $scope.getMagasinScrussale = response.data;
   });

    $scope.OnChange = function () {
        $http.get("/api/article/liste/aChoisir/"+ $scope.groupID+"/"+ $scope.stock.scrussale.id).then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.banque = null;
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };

    $scope.OnChangeChoix = function () {
        $http.get("/api/stock/liste/ArticleChoisie/"+ $scope.stock.magasin.id+"/"+ $scope.stock.scrussale.id).then(function (response) {
            $scope.users1 = response.data;
            $scope.usersTable1 = new NgTableParams(
                {
                    page: 1,
                    count: 10,
                },
                {
                    total: $scope.users1.length,
                    getData: function (params) {
                        $scope.data1 = params.sorting() ? $filter("orderBy")($scope.users1, params.orderBy()) : $scope.users1;
                        $scope.data1 = params.filter() ? $filter("filter")($scope.data1, params.filter()) : $scope.data1;
                        $scope.data1 = $scope.data1.slice((params.page() - 1) * params.count(), params.page() * params.count());

                        return $scope.data1;
                    },
                }
            );

        });
    };


    $scope.OnChangeProduit = function () {
        $http.get("/api/stock/liste/scrussale/"+ $scope.magasinID).then(function (response) {
            $scope.users2 = response.data;
            $scope.usersTable2 = new NgTableParams(
                {
                    page: 1,
                    count: 10,
                },
                {
                    total: $scope.users2.length,
                    getData: function (params) {
                        $scope.data2 = params.sorting() ? $filter("orderBy")($scope.users2, params.orderBy()) : $scope.users2;
                        $scope.data2 = params.filter() ? $filter("filter")($scope.data2, params.filter()) : $scope.data2;
                        $scope.data2 = $scope.data2.slice((params.page() - 1) * params.count(), params.page() * params.count());

                        return $scope.data2;
                    },
                }
            );

        });
    };

 	$scope.checkAll = function () {
        $scope.user.data = angular.copy($scope.users);
    };

    $scope.uncheckAll = function () {
        $scope.user.data = [];
    };

    $scope.validerChoix = function () 
    {
        if ($scope.user.data != null) {
            for (i = 0; i < $scope.user.data.length; i++) {
                $http.get("/api/stock/addChoix/" + $scope.user.data[i].id+ "/" + $scope.stock.scrussale.id+ "/" + $scope.stock.magasin.id).then(function (response) {
                    $scope.OnChangeChoix();
                    $scope.OnChange();
                });
            }

          
        } 
        else {
          
        }
     };

	$scope.approvision ={};
	
    $scope.OnSaveStockApp = function () {
        $http.post("/api/stock/save/approvisionnement/"+$scope.recupStock.id, $scope.approvision).then(
            function (response) {
                
                $scope.OnChangeProduit();
			    $scope.approvision = null;
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Approvisionnement du stock ",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
			
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

 
    // Methode pour effectuer une edition
    $scope.OnEditeRecup = function (id) {
        $http.get("/api/stock/edite/" + id).then(function (response) {
            $scope.recupStock = response.data;
        });
    };

    // Methode pour effectuer une suppression
    $scope.OnDelete = function (id) {
        $http.delete("/api/stock/delete/" + id).then(function (response) {
            $scope.OnChangeChoix();
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };

    app.config(function ($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function (date) {
            return date ? moment(date).format("DD-MM-YYYY") : "";
        };

        $mdDateLocaleProvider.parseDate = function (dateString) {
            var m = moment(dateString, "DD-MM-YYYY", true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };
    });

    $scope.searchTerm;
    $scope.clearSearchTerm = function () {
        $scope.searchTerm = "";
    };

    $element.find("input").on("keydown", function (ev) {
        ev.stopPropagation();
    });

    $scope.myDate = new Date();

    $scope.minDate = new Date($scope.myDate.getFullYear() - 1, $scope.myDate.getMonth(), $scope.myDate.getDate());

    $scope.maxDate = new Date($scope.myDate.getFullYear() + 1, $scope.myDate.getMonth(), $scope.myDate.getDate());

  
    
}




/***************************** CONTROLLEUR DE GESTION DES ECRITURES PERIODIQUES*****************************
 ************************************************************************************************************/

app.controller("paramEcriturePeriode", paramEcriturePeriode);

function paramEcriturePeriode($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
   
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.group = {};
    };

	$scope.fermer = function () {
        $scope.recupererValidation = {};
    };

    $scope.verifier = 0;
    $scope.group = {};
    $scope.users;


    
    $scope.OnChangeTypePiece = function () {
        $http.get("/api/typePiece/liste").then(function (response) {
            $scope.listestypespieces = response.data;
        });
    };
    $scope.OnChangeTypePiece();

    $scope.OnChangeMois = function () {
        $http.get("/api/mois/liste").then(function (response) {
            $scope.listesmois = response.data;
        });
    };
    $scope.OnChangeMois();

    $scope.OnChangeJournale = function () {
        $http.get("/api/journal/liste").then(function (response) {
            $scope.listesjournale = response.data;
        });
    };
    $scope.OnChangeJournale();


    $scope.OnChange = function () 
    {
        $http.get("/api/ecriture/listeSaisi").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
	$scope.OnChange();

	$scope.OnSave = function () 
	{
		  $http.post("api/ecriture/save", $scope.ecriture)
			   .then(function (response) {
					$scope.OnChange();
				new PNotify({
		                 title: 'GesStock Enregistrement',
		                 text:  'Enrégistrement de l\'ecriture '  +" "+$scope.ecriture.code+" "+  'éffectué',
		                 type:  'success',
		                 styling: 'bootstrap3',
		                 delay:3000,
		                 history:false,
		                 sticker:true
		                  
		                });
				},function errorCallback(response){
	    			   new PNotify
					   ({
		                     title: 'GesStock Message d\'erreur',
		                     text: 'Une erreur liée au serveur s\'est produite',
		                     type: 'error',
		                     styling: 'bootstrap3',
		                     delay:3000,
		                     history:false,
		                     sticker:true
		                      
	                    });
	    	})
	 }

	
   
   $scope.OnChangeDetailEcriture = function () {
        $http.get("/api/detailEcriture/liste/"+$scope.ecritureRecuperer.id).then(function (response) {
            $scope.users1 = response.data;
            $scope.usersTable1 = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users1.length,
                    getData: function (params) {
                        $scope.data1 = params.sorting() ? $filter("orderBy")($scope.users1, params.orderBy()) : $scope.users1;
                        $scope.data1 = params.filter() ? $filter("filter")($scope.data1, params.filter()) : $scope.data1;
                        $scope.data1 = $scope.data1.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data1;
                    },
                }
            );
	        $scope.detailEcriture = null;
            $scope.user.data = null;
        });
    };
 
    $scope.OnEditeDetail = function (id) {
        $http.get("/api/ecriture/edite/" + id).then(function (response) {
	     $scope.ecritureRecuperer = response.data;
			//console("****************"+ $scope.ecritureRecuperer.id);
            $scope.OnChangeDetailEcriture();
        });
    };

    $scope.OnValid = function (id) {
           $http.get("/api/detailEcriture/validations/" + id).then(function (response) {
	       $scope.OnChange();
        });
    };


    $scope.OnDelete = function (id) {
        $http.delete("/api/detailEcriture/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

	$scope.OnDeleteDetailsEcri = function (id) {
        $http.delete("/api/detailEcriture/delete/" + id).then(function (response) {
            $scope.OnChangeDetailEcriture();
        });
    };


 	$scope.showConfirmValidate = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir valider cette écriture comptable,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnValidate(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Validation éffectuer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };


   $http.get("/api/classe/liste").then(function (response) {
            $scope.listeclasses = response.data;
    });

   $scope.OnSousClasses = function (id) {
        $http.get("/api/sousClasse/liste/classe/" + id).then(function (response) {
            $scope.findsousclasses = response.data;
        });
    };

   $scope.OnSubdivision = function (id) {
        $http.get("/api/subdivision/liste/sousClasse/" + id).then(function (response) {
            $scope.findsubdivision= response.data;
        });
    };
    $scope.OnChangeCompte2 = function () {
	        $http.get("/api/compte/liste/subdivision/" +$scope.souscompte.subdivision.id).then(function (response) {
	            $scope.findcomptesreels = response.data;
	        });
	    };

	 $scope.OnChangeSousCompte = function () {
	        $http.get("/api/souscompte/liste/compte/" +$scope.detailEcriture.compte.id).then(function (response) {
	            $scope.findsouscomptesreels = response.data;
	        });
	    };



	$scope.OnSaveDetails = function () 
	{
		  $http.post("api/detailEcriture/save/"+$scope.ecritureRecuperer.id, $scope.detailEcriture)
			   .then(function (response) {
					$scope.OnChangeDetailEcriture();
				new PNotify({
		                 title: 'GesStock Enregistrement',
		                 text:  'Enrégistrement de l\'ecriture '  +" "+$scope.detailEcriture.libelle+" "+  'éffectué',
		                 type:  'success',
		                 styling: 'bootstrap3',
		                 delay:3000,
		                 history:false,
		                 sticker:true
		                  
		                });
				},function errorCallback(response){
	    			   new PNotify
					   ({
		                     title: 'GesStock Message d\'erreur',
		                     text: 'Une erreur liée au serveur s\'est produite',
		                     type: 'error',
		                     styling: 'bootstrap3',
		                     delay:3000,
		                     history:false,
		                     sticker:true
		                      
	                    });
	    	})
	 }










}





/***************************** CONTROLLEUR DE GESTION DES ECRITURES COMPTABLES *****************************
 ************************************************************************************************************/

app.controller("paramEcriture", paramEcriture);

function paramEcriture($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.group = {};
    };

	$scope.fermer = function () {
        $scope.recupererEcriture = {};
    };

    $scope.verifier = 0;
    $scope.group = {};
    $scope.users;


    
    $scope.OnChangeScrussale = function () {
        $http.get("/api/scrussale/liste").then(function (response) {
            $scope.listescrussales = response.data;
        });
    };
    $scope.OnChangeScrussale();

    $scope.OnChangeMois = function () {
        $http.get("/api/mois/liste").then(function (response) {
            $scope.listesmois = response.data;
        });
    };
    $scope.OnChangeMois();

   $scope.OnValidate = function (id) {
        $http.get("/api/ecriture/validate/"+id).then(function (response) {
             $scope.OnChange();
        });
    };

   $scope.OnEdite = function (id) {
        $http.get("/api/ecriture/edite/"+id).then(function (response) {
             $scope.recupererEcriture = response.data;
        });
    };

    $scope.OnChange = function () 
    {
        $http.get("/api/ecriture/liste/"+ $scope.scrussaleID+"/"+ $scope.moisID).then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.group = null;
            $scope.verifier = 0;
            $scope.user.data = null;
 			$scope.OnChangeTrue();
        });
    };


    $scope.OnChangeTrue = function () 
    {
        $http.get("/api/ecriture/liste/true/"+ $scope.scrussaleID+"/"+ $scope.moisID).then(function (response) {
             $scope.listeVaider = response.data;
        });
    };


   $scope.OnChangeDetail = function (id) {
        $http.get("/api/detailEcriture/liste/"+id).then(function (response) {
            $scope.users1 = response.data;
            $scope.usersTable1 = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users1.length,
                    getData: function (params) {
                        $scope.data1 = params.sorting() ? $filter("orderBy")($scope.users1, params.orderBy()) : $scope.users1;
                        $scope.data1 = params.filter() ? $filter("filter")($scope.data1, params.filter()) : $scope.data1;
                        $scope.data1 = $scope.data1.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data1;
                    },
                }
            );
	        
			$scope.sommeDebit(id) ;
			$scope.sommeCredit(id) ;
			$scope.OnEdite(id) ;
            $scope.user.data = null;
        });
    };
 
 
    $scope.sommeDebit = function (id) {
	  $http.get("/api/detailEcriture/calculDebit/"+id).then(function (response) {
           $scope.soldeDebit  = response.data;
        });
       
    };

    $scope.sommeCredit = function (id) {
	  $http.get("/api/detailEcriture/calculCredit/"+id).then(function (response) {
           $scope.soldeCredit  = response.data;
        });
       
    };

    $scope.OnDelete = function (id) {
        $http.delete("/api/detailEcriture/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };


 $scope.showConfirmValidate = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir valider cette écriture comptable,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnValidate(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Validation éffectuer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}





/***************************** CONTROLLEUR DE GESTION DES VALIDATIONS INVENTAIRES *****************************
 ************************************************************************************************************/

app.controller("paramValidation", paramValidation);

function paramValidation($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
   
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.group = {};
    };

	$scope.fermer = function () {
        $scope.recupererValidation = {};
    };

    $scope.verifier = 0;
    $scope.group = {};
    $scope.users;


    
    $scope.OnChangeScrussale = function () {
        $http.get("/api/scrussale/liste").then(function (response) {
            $scope.listescrussales = response.data;
        });
    };
    $scope.OnChangeScrussale();

    $scope.OnChangeMois = function () {
        $http.get("/api/mois/liste").then(function (response) {
            $scope.listesmois = response.data;
        });
    };
    $scope.OnChangeMois();

    $scope.OnChange = function () 
    {
        $http.get("/api/inventaire/liste/validation/"+ $scope.scrussaleID+"/"+ $scope.moisID).then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };


     $scope.OnSeeDetails = function (id) 
     {
        $http.get("/api/inventaire/verification/detail/"+ id).then(function (response) {
            $scope.users2 = response.data;
			$scope.inventaire = id;
            $scope.usersTable2 = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users2.length,
                    getData: function (params) {
                        $scope.data2 = params.sorting() ? $filter("orderBy")($scope.users2, params.orderBy()) : $scope.users2;
                        $scope.data2 = params.filter() ? $filter("filter")($scope.data2, params.filter()) : $scope.data2;
                        $scope.data2 = $scope.data2.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data2;
                    },
                }
            );

            $scope.verifier = 0;
            $scope.user.data = null;
        });
     };

	$scope.checkAll = function () {
        $scope.user.data2 = angular.copy($scope.users2);
    };

    $scope.uncheckAll = function () {
        $scope.user.data2 = [];
    };

    $scope.validerChoix = function () 
    {
        if ($scope.user.data2 != null) {
            for (i = 0; i < $scope.user.data2.length; i++) {
                $http.get("/api/inventaire/validate/detail/" + $scope.user.data2[i].id).then(function (response) {
                    $scope.OnSeeDetails($scope.inventaire);
                });
            }

          
        } 
        else {
          
        }
     };

   $scope.OnChangeDetail = function (id) {
        $http.get("/api/detailEcriture/liste/"+id).then(function (response) {
            $scope.users1 = response.data;
            $scope.usersTable1 = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users1.length,
                    getData: function (params) {
                        $scope.data1 = params.sorting() ? $filter("orderBy")($scope.users1, params.orderBy()) : $scope.users1;
                        $scope.data1 = params.filter() ? $filter("filter")($scope.data1, params.filter()) : $scope.data1;
                        $scope.data1 = $scope.data1.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data1;
                    },
                }
            );
	        
			$scope.sommeDebit(id) ;
			$scope.sommeCredit(id) ;
			$scope.OnEdite(id) ;
            $scope.user.data = null;
        });
    };
 
 
    $scope.sommeDebit = function (id) {
	  $http.get("/api/detailEcriture/calculDebit/"+id).then(function (response) {
           $scope.soldeDebit  = response.data;
        });
       
    };

    $scope.sommeCredit = function (id) {
	  $http.get("/api/detailEcriture/calculCredit/"+id).then(function (response) {
           $scope.soldeCredit  = response.data;
        });
       
    };

    $scope.OnDelete = function (id) {
        $http.delete("/api/detailEcriture/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };


 $scope.showConfirmValidate = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir valider cette écriture comptable,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnValidate(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Validation éffectuer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}

















/***************************** CONTROLLEUR DE GESTION BON LIVRAISON *****************************
 ***********************************************************************************************/

app.controller("paramBonLivraison", paramBonLivraison);

function paramBonLivraison($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
   
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.livraison = {};
    };
  
 	$scope.livraison = {};
	$scope.detaillivraison = {};
    $scope.swithlivraison = 0;

    $scope.fermerBon = function () 
    {
        $scope.swithlivraison = 0;
 		$scope.livraisonRecuperer = null;
    };   

    $scope.afficherDetailLivraison = function () 
	{
        $scope.swithlivraison = 1;
    };

    $scope.fermerLivraison = function () 
    {
        $scope.swithlivraison = 0;
	 	$scope.detaillivraison = null;
    };   



	//******************* OPERATION SUR LES BON LIVRAISON ***********************************//
	
	$scope.checkAll = function () {
        $scope.user.data = angular.copy($scope.users);
    };

    $scope.uncheckAll = function () {
        $scope.user.data = [];
    };

	$scope.OnVirify = function () {
        $http.get("/api/bonLivraison/ctrl/" + $scope.livraisonRecuperer.id).then(function (response) {
           
				if( response.data == false )
				{
					 $scope.generateEcritureBon();
				}else{
					 new PNotify({
			                    title: "GESCCOM-WEB Validation",
			                    text: "Stock des Articles Non Diponible la Génération de l\'écriture ne sera pas prise en compte ",
			                    type: "warning",
			                    styling: "bootstrap3",
			                    delay: 4000,
			                    history: false,
			                    sticker: true,
			                });
				}

        });
    };

    $scope.generateEcritureBon = function () 
    {
        $http.get("/api/bonLivraison/generate/" + $scope.livraisonRecuperer.id).then(function (response) {
                  
						if( response.data == false )
						{
							 new PNotify({
			                    title: "GESCCOM-WEB Validation",
			                    text: "Cette écriture à été déja générée",
			                    type: "warning",
			                    styling: "bootstrap3",
			                    delay: 3000,
			                    history: false,
			                    sticker: true,
			                });
						}
						else
						{
							 new PNotify({
			                    title: "GESCCOM-WEB Validation",
			                    text: "Génération de l\'ecriture comptable éffectuer avec succes",
			                    type: "info",
			                    styling: "bootstrap3",
			                    delay: 3000,
			                    history: false,
			                    sticker: true,
			                });
							$scope.OnValidateBon();
							$scope.OnChoixVenteListe($scope.livraisonRecuperer.vente.id);
						
					   }
					 $scope.OnChoixVenteListe($scope.livraisonRecuperer.vente.id);
					 $scope.OnUpdateLivraison();
                });
          
     };


 	
    $scope.showConfirmGenerate = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir générer la facture pour cet proforma,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.generateVente(id);
            
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de génération annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };


    $http.get("/api/client/liste/scrussale").then(function (response) {
            $scope.findclients = response.data;
    });

    
    $scope.OnSaveLivraison = function () 
	{
        $http.post("/api/bonLivraison/save", $scope.livraison).then(
            function (response) {
			    $scope.livraisonRecuperer = response.data;
				//$scope.proformaRecuperer.dateProforma = new Date($scope.proformaRecuperer.dateProforma);
                $scope.OnChange();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du bon de livraison éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
				 $scope.afficherDetailLivraison();
			 	
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

   $scope.OnGetLivraison = function (id) {
        $http.get("/api/bonLivraison/edite/" + id).then(function (response) {
           $scope.livraisonRecuperer = response.data;
		   $scope.livraisonRecuperer.dateLivraison= new Date($scope.livraisonRecuperer.dateLivraison);
		   $scope.afficherDetailLivraison();
		   $scope.OnChangeVente();
		   $scope.OnChoixVenteListe($scope.livraisonRecuperer.vente.id);
        });
    };


   $scope.OnChangeVente = function () 
   {
         $http.get("/api/bonLivraison/liste/vente").then(function (response) {
            
			$scope.users1 = response.data;
			
            $scope.usersTable1 = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users1.length,
                    getData: function (params) {
                        $scope.data1 = params.sorting() ? $filter("orderBy")($scope.users1, params.orderBy()) : $scope.users1;
                        $scope.data1 = params.filter() ? $filter("filter")($scope.data1, params.filter()) : $scope.data1;
                        $scope.data1 = $scope.data1.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data1;
                    },
                }
            );

            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };


//*******************OPERATION SUR LES DETAILS DE BON LIVRAISON ***********************************//

	$scope.OnUpdateLivraison = function () 
   {
        $http.post("/api/bonLivraison/update",$scope.livraisonRecuperer).then(
            function (response) {
             
				//$scope.livraisonRecuperer.garantie = null;
				//$scope.livraisonRecuperer.observation = null;
				//$scope.livraisonRecuperer.adresseLivraison = null;
            });
    };


   $scope.OnSaveDetails = function (id,qte) 
   {
	
	   if(qte==undefined){
		new PNotify({
                    title: "GESCCOM-WEB Avertissement",
                    text: "La quantité a livrer doit etre superieur a 0",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
	   }else{
		
	   $http.get("/api/bonLivraison/validate/details/"+id+"/"+qte).then(
            function (response) {
               
				$scope.OnChoixVenteListe($scope.livraisonRecuperer.vente.id);
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement du detail de bon livraison",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
			
				
            },
            function errorCallback(response) 
			{
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
		}
     
    };

    $scope.verifier = 0;
    $scope.users;

    $scope.OnChange = function () {
        $http.get("/api/bonLivraison/liste").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );
			
            $scope.verifier = 0;
            $scope.user.data = null;
        });
    };
    $scope.OnChange();

	$scope.OnValidateBon = function () 
    {
        $http.get("/api/bonLivraison/calculer/quantite/"+$scope.livraisonRecuperer.id).then(
            function (response) {
               $scope.resultats = response.data;

				if($scope.resultats==false)  
				{
					new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Cet Ne Peut Etre Approuver Car la quantite disponible ne suffi pas pour la livraison",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                	});
				}else
				{
					
				}
               
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    $scope.OnChoixVente = function (id) 
    {
         $http.get("/api/bonLivraison/generate/details/"+id+"/"+$scope.livraisonRecuperer.id).then(function (response) {
             $scope.OnChoixVenteListe(id);
				$scope.OnChangeVente(id);
        });
     };

	$scope.confirm = true;
	
    $scope.OnChoixVenteListe = function (id) 
    {
         $http.get("/api/bonLivraison/liste/details/"+id).then(function (response) {
            
			$scope.users2 = response.data;
			if ($scope.users2.length>1)
			{
     			$scope.confirm=false;
     		}
            $scope.usersTable2 = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users2.length,
                    getData: function (params) {
                        $scope.data2 = params.sorting() ? $filter("orderBy")($scope.users2, params.orderBy()) : $scope.users2;
                        $scope.data2 = params.filter() ? $filter("filter")($scope.data2, params.filter()) : $scope.data2;
                        $scope.data2 = $scope.data2.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data2;
                    },
                }
            );

            $scope.verifier = 0;
            $scope.user.data = null;
        });
     };
    


 	$scope.OnDeleteLivraison = function (id) {
        $http.delete("/api/bonLivraison/delete/" + id).then(function (response) {
            $scope.OnChange();
        });
    };

    // Methode de notification pour la suppression
    $scope.showConfirm = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDelete(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };

    $scope.showConfirmProforma = function (event, id) {
        var confirm = $mdDialog
            .confirm()
            .title("Etes-vous sur de vouloir supprimer cet enregistremnt,")
            .textContent("Cet operation ne pourra plus être annuler")
            .ariaLabel("GESCCOM-WEB Avertissement")
            .targetEvent(event)
            .ok("Oui")
            .cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDeleteLivraison(id);
                new PNotify({
                    title: "GESCCOM-WEB Validation",
                    text: "Enregistrement supprimer avec succes",
                    type: "info",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function () {
                new PNotify({
                    title: "GESCCOM-WEB Information ",
                    text: "Opération de suppression annulée",
                    type: "warning",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
    };
    $scope.regex = "^[a-zA-Z0-9._-]+$";

    $scope.transfererx = function () {
        $("#myModal").modal({
            backdrop: "static",
        });
        $("#myModal").modal({
            keyboard: true,
        });
    };

    $scope.fermer = function () {
        $("#myModal").modal("hide");
    };
}











/***************************** CONTROLLEUR DE GESTION DES UTILISATEURS *****************************
 ***********************************************************************************************/
app.controller("paramUtilisateur", paramUtilisateur);

function paramUtilisateur($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.user = {};
    };

    $scope.verifier = 0;
    $scope.utilisateur = {};
    $scope.users;

    $scope.OnListeRole = function () {
        $http.get("/Security/listeRole").then(function (response) {
            $scope.listeroles = response.data;
        });
    };

     $http.get("/api/scrussale/liste").then(function (response) {
            $scope.listescrussales = response.data;
        });

    $scope.OnListeRole();

    $scope.OnChangeUser = function () {
        $http.get("/Security/listeUser").then(function (response) {
            $scope.users = response.data;
            $scope.usersTable = new NgTableParams(
                {
                    page: 1,
                    count: 5,
                },
                {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter("orderBy")($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter("filter")($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    },
                }
            );

            $scope.utilisateur = null;
           // $scope.utilisateur.role = null;
            $scope.verifier = 0;
            $scope.users.data = null;
        });
    };

    $scope.OnChangeUser();

    //Methode pour pour effectuer un enregistrement d'utilisateur
    $scope.OnSaveUser = function () {
        $http.post("/Security/addUser", $scope.utilisateur)
           .then(
            function (response) {
                $scope.utilisateur = response.data;
                username = $scope.utilisateur.username;
				role =  $scope.role;
                $http.post("/Security/addRoleToUser2/"+username+"/"+role);
               // $scope.OnUserEcran();
                $scope.OnChangeUser();
                new PNotify({
                    title: "GESCCOM-WEB Enregistrement",
                    text: "Enrégistrement de " + " " + $scope.utilisateur.nomComplet + " " + "éffectué",
                    type: "success",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            },
            function errorCallback(response) {
                new PNotify({
                    title: "GESCCOM-WEB Message d'erreur",
                    text: "Une erreur liée au serveur s'est produite",
                    type: "error",
                    styling: "bootstrap3",
                    delay: 3000,
                    history: false,
                    sticker: true,
                });
            }
        );
        $scope.utilisateur = null;
    };

    //Methode pour effectuer une edition d'utilisateur
    $scope.OnEditeUser = function (id) {
        $http.get("/Security/updateUser/" + id).then(function (response) {
            $scope.utilisateur = response.data;
            $scope.verifier = 1;
        });
    };




    $scope.OnActiveProfil = function (id) {
        $http.get("/Security/activerprofil/" + id).then(function (response) {
            $scope.OnChangeUser();
            new PNotify({
                title: "GESCCOM-WEB Information ",
                text: "Vous venez d'activer cet utilisateur",
                type: "info",
                styling: "bootstrap3",
                delay: 3000,
                history: false,
                sticker: true,
            });
        });
    };

    $scope.OnDesctiverProfil = function (id) {
        $http.get("/Security/desactiverprofil/" + id).then(function (response) {
            $scope.OnChangeUser();
            new PNotify({
                title: "GESCCOM-WEB Information ",
                text: "Vous venez de désactiver cet utilisateur",
                type: "info",
                styling: "bootstrap3",
                delay: 3000,
                history: false,
                sticker: true,
            });
        });
    };

    $scope.OnActiverToutProfils = function () {
        $http.get("/Security/activerprofiltout").then(function (response) {
            $scope.OnChangeUser();
            new PNotify({
                title: "GESCCOM-WEB Information ",
                text: "Vous venez d'activer tout les utilisateurs",
                type: "info",
                styling: "bootstrap3",
                delay: 3000,
                history: false,
                sticker: true,
            });
        });
    };

    $scope.OnDesactiverToutProfils = function () {
        $http.get("/Security/desactiverprofiltout").then(function (response) {
            $scope.OnChangeUser();
            new PNotify({
                title: "GESCCOM-WEB Information ",
                text: "Vous venez désactiver cet utilisateur",
                type: "info",
                styling: "bootstrap3",
                delay: 3000,
                history: false,
                sticker: true,
            });
        });
    };

    $scope.showConfirmActiverProfil = function (event, id) {
        var confirm = $mdDialog.confirm().title("Etes-vous sur de vouloir activer cet utilisateur,").textContent("Cet operation ne pourra plus être annuler").ariaLabel("UM Avertissement").targetEvent(event).ok("Oui").cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnActiveProfil(id);
                $scope.status = "Activation éffectuer avec succès";
            },
            function () {
                $scope.status = "Opération annulée";
            }
        );
    };

    $scope.showConfirmDesactiverProfil = function (event, id) {
        var confirm = $mdDialog.confirm().title("Etes-vous sur de vouloir désactiver cet utilisateur,").textContent("Cet operation ne pourra plus être annuler").ariaLabel("UM Avertissement").targetEvent(event).ok("Oui").cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDesctiverProfil(id);
                $scope.status = "Désactivation éffectuer avec succès";
            },
            function () {
                $scope.status = "Opération annulée";
            }
        );
    };

    $scope.showConfirmActiverToutProfil = function (event) {
        var confirm = $mdDialog.confirm().title("Etes-vous sur de vouloir activer tous les utilisateurs,").textContent("Cet operation ne pourra plus être annuler").ariaLabel("UM Avertissement").targetEvent(event).ok("Oui").cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnActiverToutProfils();
                $scope.status = "Activation éffectuer avec succès";
            },
            function () {
                $scope.status = "Opération annulée";
            }
        );
    };

    $scope.showConfirmDesactiverToutProfil = function (event) {
        var confirm = $mdDialog.confirm().title("Etes-vous sur de vouloir désactiver tous les utilisateurs,").textContent("Cet operation ne pourra plus être annuler").ariaLabel("UM Avertissement").targetEvent(event).ok("Oui").cancel("Non");
        $mdDialog.show(confirm).then(
            function () {
                $scope.OnDesactiverToutProfils();
                $scope.status = "Désactivation éffectuer avec succès";
            },
            function () {
                $scope.status = "Opération annulée";
            }
        );
    };

    $scope.utilisateurecran;
    // Methode pour charger les notifications
    $scope.OnUserEcran = function () {
        $http.get("/Security/getLoggers").then(function (response) {
            $scope.utilisateurecran = response.data;
        });
    };

    $scope.OnUserEcran();
}

/***************************** CONTROLLEUR GRILLES DES STATS *****************************
 ***********************************************************************************************/

app.controller("paramGrille", paramGrille);

function paramGrille($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location) {
    $scope.user = {
        data: [],
    };

    $scope.init = function () {
        $scope.unitevente = {};
    };

    $scope.OnListeBanque = function () {
        $http.get("/api/banque/liste").then(function (response) {
            $scope.banques = response.data;
        });
    };

    $scope.OnExporte = function () {
        $http.get("/export/api/beneficiaire/excel").then(function (response) {});
    };
    $scope.OnListeBanque();

    $scope.OnListeBeneficiaire = function () {
        $http.get("/api/beneficiaire/liste").then(function (response) {
            $scope.beneficiaires = response.data;
        });
    };
    $scope.OnListeBanque();
}

/***************************** CONTROLLEUR GRILLES DES STATS *****************************
 ***********************************************************************************************/

app.controller("paramExporter", paramExporter);

function paramExporter($scope, $window, $mdSelect, $mdDialog, $http, $rootScope, $element, $filter, $routeParams, NgTableParams, $location, fileUpload) {
    $scope.uploadxls = function () {
        var file = $scope.myFile;
        console.log("file is ");
        console.dir(file);
        if (file != undefined) {
            var uploadUrl = "import/api/import-order-excel";

            fileUpload.uploadFileToUrl(file, uploadUrl);
        }
    };
}
