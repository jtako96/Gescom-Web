var app= angular.module('etudiantapp', ['ngMaterial','ngMessages','ngRoute','ngTable','checklist-model']);
			       
			app.directive('convertToNumber', function() {
			    return {
			        require: 'ngModel',
			        link: function (scope, element, attrs, ngModel) {                
			            ngModel.$parsers.push(function(val) {                    
			                return parseInt(val, 10);
			            });
			            ngModel.$formatters.push(function (val) {                    
			                return '' + val;
			            });
			        }
			    };
			});

            app.controller('dialogController', dialogController);

                function dialogController ($scope, $mdDialog) {
                    $scope.status = '';
                    $scope.items = [1,2,3,4,5];
                    $scope.showAlert = function(ev) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#dialogContainer')))
                            .clickOutsideToClose(true)
                            .title('TutorialsPoint.com')
                            .textContent('Welcome to TutorialsPoint.com')
                            .ariaLabel('Welcome to TutorialsPoint.com')
                            .ok('Ok!')
                            .targetEvent(ev)
                    );
                   };
                    
                    
                    $scope.showConfirm = function(event) {
                    var confirm = $mdDialog.confirm()
                        .title('Are you sure to delete the record?')
                        .textContent('Record will be deleted permanently.')
                        .ariaLabel('TutorialsPoint.com')
                        .targetEvent(event)
                        .ok('Yes')
                        .cancel('No');
                        $mdDialog.show(confirm).then(function() {
                            $scope.status = 'Record deleted successfully!';
                            }, function() {
                                $scope.status = 'You decided to keep your record.' ;
                        });
                    };

                    

                    
                    $scope.showCustom = function(event) {
                    $mdDialog.show({
                        clickOutsideToClose: true,
                        scope: $scope,        
                        preserveScope: true,           
                        template: '<md-dialog>' +
                                    '  <md-dialog-content>' +
                                    '     Welcome to TutorialsPoint.com' +
                                    '  </md-dialog-content>' +
                                    '</md-dialog>',
                        controller: function DialogController($scope, $mdDialog) {
                            $scope.closeDialog = function() {
                                $mdDialog.hide();
                            }
                        }
                    });
                    };
                }      
         
 
                app.controller('paramrecup', paramrecup);

                function paramrecup($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                               		
                               		   $http.get("/recupereAnnee")
                                          .then(function(response){
                                                  
                                                  $scope.an=response.data;
                                                  
                                           });
                               		   
                               		


               };
/**
 * CONTROLLEUR POUR LA GESTION DES ETUDIANTS
 * @param $scope
 * @param $window
 * @param $mdSelect
 * @param $mdDialog
 * @param $http
 * @param $rootScope
 * @param $element
 * @param $filter
 * @param $routeParams
 * @param NgTableParams
 * @param $location
 * @returns tous les operation qui concerne les etudiants
 */           

app.controller('parametudiant', parametudiant);

		   function parametudiant($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
			
		   $scope.etudiant={};
		   $scope.listeetudiant={};
		   $scope.users;
		   
		   $http.get("/listeTitre")
           .then(function(response){
                   
                   $scope.listetitres=response.data;
                   
            });
		   
		   $http.get("/listePays")
           .then(function(response){
                   
                   $scope.listepays=response.data;
                   
            });
		   
		   $http.get("/listeNationalite")
           .then(function(response){
                   
                   $scope.listenationalites=response.data;
                   
            });
		   
		   $http.get("/listeStatut")
           .then(function(response){
                   
                   $scope.listestatuts=response.data;
                   
            });
		   
		   $http.get("/listeSituationMat")
           .then(function(response){
                   
                   $scope.listesituationmats=response.data;
                   
            });
		   
		   $http.get("/listeCongregation")
           .then(function(response){
                   
                   $scope.listecongregations=response.data;
                   
            });
		   
		   $http.get("/listeParcours")
           .then(function(response){
                   
                   $scope.listeparcours=response.data;
                   
            });
		   
		   $http.get("/listeMentionBac")
           .then(function(response){
                   
                   $scope.listementionbacs=response.data;
                   
            });
		   
		   $http.get("/listeSerie")
           .then(function(response){
                   
                   $scope.listeseries=response.data;
                   
            });
		   
		   $http.get("/listeProfession")
           .then(function(response){
                   
                   $scope.listeprofessions=response.data;
                   
            });
		   
		   $scope.chargeretudiant=function(idp)
		    {
		            $http.get("/listeEtudiant?id="+idp)
		                 .then(function(response){
		                      $scope.users=response.data;	
		                      $scope.usersTable = new NgTableParams({
		                                    page: 1,
		                                    count:5
		                                    }, {
		                                    total: $scope.users.length,
		                                    getData: function (params) {
		                                    $scope.data = params.sorting() ? $filter('orderBy')($scope.users, params.orderBy()) : $scope.users;
		                                    $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
		                                    $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
		                                    return $scope.data;
		                                    }
		                                    }); 
		                                $scope.etudiant=null;
		                                $scope.user.data=null;
		                            });
		    };
		    
		    
		    
		    $scope.user = {
		          data: []                            
		    }; 
		    
		    $scope.init=function(){
		          $scope.etudiant={};
		    }
                    
            $scope.showConfirm = function(event,id) {
                   var confirm = $mdDialog.confirm()
                   .title('Etes-vous sur de vouloir supprimer cet étudiant,')
                   .textContent('Cet operation ne pourra plus être annuler')
                   .ariaLabel('UM Avertissement')
                   .targetEvent(event)
                   .ok('Oui')
                   .cancel('Non');
                        $mdDialog.show(confirm).then(function() {
                            $scope.supprimeretudiant(id);
                            $scope.status = 'Enregistrement supprimer avec succès';
                            }, function() {
                                $scope.status = 'Opération annulée';                     
                        });
             };$scope.regex = '^[a-zA-Z0-9._-]+$';
             
        	 $scope.transfererx=function(){
                 $("#myModal").modal({backdrop:"static"});
                         $("#myModal").modal({keyboard: true});
                        
             };
             $scope.fermer=function(){
                  $("#myModal").modal('hide');
              }; 
              
             $scope.valideretudiant=function()
             {
            		$http.post("/addEtudiant?p="+$scope.parcours.idParcours,$scope.etudiant)
            		.then(function(response){ 
            			   
                         $scope.etudiant=response.data;
            			 username=$scope.etudiant.nomEtudiant+$scope.etudiant.idEtudiant;
                	$http.post("/addRoleToUser?username="+username+"&role=Etudiant")
            		    $scope.chargeretudiant($scope.parcours.idParcours);
            		    
                	 new PNotify({
                         title: 'Umanager notification ',
                         text:  'Inscription éffectuée avec succes',
                         type: 'success',
                         styling: 'bootstrap3',
                         delay:2000,
                         history:false,
                         sticker:true
                          
                        });
         		    
           		},function errorCallback(response){
           			new PNotify({
                          title: 'Umanager error ',
                          text: 'Cet étudiant est déjà inscrit',
                          type: 'error',
                          styling: 'bootstrap3',
                          delay:2500,
                          history:false,
                          sticker:true
                           
                         });
         			 
         		 })
           			
            			
           	   
             }
             
             $scope.modifieretudiant=function(){
                   $http.get("/updateEtudiant?e=",$scope.etudiant)
                        .then(function(response){
                        	   $scope.etudiant=response.data;
                        	   $scope.etudiant.dateNaissanceEtudiant = new Date( $scope.etudiant.dateNaissanceEtudiant)
                                 
                            });
             }  
             
             $scope.modifieretudiantID=function(id1){
                 $http.get("/updateEtudiant2?e="+id1)
                      .then(function(response){
                    	      $scope.etudiant=response.data;
                    	      $scope.etudiant.dateNaissanceEtudiant = new Date( $scope.etudiant.dateNaissanceEtudiant)
                              
                          });
           }    
            
            
             $scope.modifieretudiant2=function(id1){
                 $http.get("/updateEtudiant2?e="+id1)
                      .then(function(response){
                              
                              $scope.etudiants=response.data;
                              
                          });
           }    
            
            
             
             $scope.supprimeretudiant=function(id){
                 $http.delete("/deleteEtudiant?id="+id+"&idp="+$scope.parcours.idParcours)
                 	  .then(function(response){
                         $scope.chargeretudiant($scope.parcours.idParcours);
                  });
             };

             $scope.checkAll = function() {

					$scope.user.data = angular.copy($scope.users);
						
				};
		
			 $scope.uncheckAll = function() {

					 $scope.user.data= [];
					 
				};

	 $scope.transfererAbandon=function(){
   	    	
	    	for (i=0;i<$scope.user.data.length;i++){
			 		$http.get("/transfererEtudiant?etu="+$scope.user.data[i].idEtudiant+"&p="+$scope.parcoursID)
					.then(function(response){  
						
						
					});
				 
				}
				    	
				    $scope.chargeretudiant($scope.parcours.idParcours);	     
					$scope.pop1='Transfert effectuer avec succès de'+' '+i+' etudiant  ';
					  new PNotify({
                         title: 'Umanager notification ',
                         text:  'Transfert effectuer avec succès de'+' '+i+' etudiant',
                         type: 'success',
                         styling: 'bootstrap3',
                         delay:2000,
                         history:false,
                         sticker:true
                          
                        });
				
					$scope.parcoursID = null;
					
	  }   
				 $scope.chargeruevalider=function(){
		    		  $http.get("/listeAncienEtudiant")
		    			.then(function(response){
		    			 
		    				$scope.users1=response.data	
		      			    $scope.usersTable1 = new NgTableParams({
		      				page: 1,
		      				count:10
		      				}, {
		      				total: $scope.users1.length,
		      				getData: function (params) {
		      				$scope.data1 = params.sorting() ? $filter('orderBy')($scope.users1, params.orderBy()) : $scope.users1;
		      				$scope.data1 = params.filter() ? $filter('filter')($scope.data1, params.filter()) : $scope.data1;
		      				$scope.data1 = $scope.data1.slice((params.page() - 1) * params.count(), params.page() * params.count());
		      				 
		      				return $scope.data1;
		      				 
		      				}
		      				}); 
		    				
		         		});  
		         		
		         	};
		         	$scope.chargeruevalider()  ;
		         	
    };
                    

           