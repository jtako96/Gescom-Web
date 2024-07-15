var app= angular.module('paramapp', ['xeditable','ngMaterial','ngMessages','ngRoute','ngTable','checklist-model']);

			app.run(function(editableOptions) {
				  editableOptions.theme = 'bs3';
				});
			
	
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
        
         
/**
 * CONTROLLEUR POUR UTILISATEUR CONECTER 
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
 * @returns
 */
app.controller('paramrecup', paramrecup);

 function paramrecup($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                		
                		   $http.get("/recupereAnnee")
                           .then(function(response){
                                   
                                   $scope.an=response.data;
                                   
                            });
                		   
                		   
                		   $http.get("/recupereruser")
                           .then(function(response){
                                   
                                   $scope.conactive=response.data;
                                   
                            });
                		   
               
                		   $http.get("/totalFille")
                           .then(function(response){
                                   
                                   $scope.fille=response.data;
                                   
                            });
                		   
                		   $http.get("/totalGarcon")
                           .then(function(response){
                                   
                                   $scope.Garcon=response.data;
                                   
                            });
                		   
                		   $http.get("/totalAll")
                           .then(function(response){
                                   
                                   $scope.all=response.data;
                                   
                            });
                		  

};
 
/////////////////////////// sauvegarde et restauration//////////////////////////////////////////


app.controller('paramsauvegarde', paramsauvegarde);

function paramsauvegarde($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {


			

   	
	
	$scope.showConfirmsauv= function(event,id) {
   var confirm = $mdDialog.confirm()
      .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
      .textContent('Cet operation ne pourra plus être annuler')
      .ariaLabel('SM Avertissement')
      .targetEvent(event)
      .ok('Yes')
      .cancel('No');
      $mdDialog.show(confirm).then(function() {
   	   $scope.sauvegarder();
         $scope.confirm = 'Sauvegarde effectuer avec succès!';
         }, function() {
                                
      });
}; 



$scope.showConfirmrest = function(event,id) {
 var confirm = $mdDialog.confirm()
    .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
    .textContent('Cet operation ne pourra plus être annuler')
    .ariaLabel('SM Avertissement')
    .targetEvent(event)
    .ok('Yes')
    .cancel('No');
    $mdDialog.show(confirm).then(function() {
 	   $scope.restaurer();
        
       }, function() {
                              
    });
}; 

$scope.sauvegarder=function(){
	$http.get("/sauvegarder")
 		.then(function(response){  		
 	       
 		     })
			 
		};
	
		$scope.restaurer=function(){
			
			if ($scope.daterestauration.length<14){
				 
				
				$scope.confirm="Le format de pararmetre n'est pas correct"
			}else{
				
    		$http.get("/restaurer?daterestauration="+$scope.daterestauration)
	       		.then(function(response){  		
	       		$scope.confirm = response.data.resultat;
	         	$scope.confirm2 = response.data.Commentaire;
	       			
	       		     })
			}
    };
};

app.controller('paramrecup2', paramrecup2);

		function paramrecup2($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
		               		
		               		   $http.get("/totalvalider")
                          .then(function(response){
                                  
                                  $scope.valider=response.data;
                                  
                           });
               		   
               	
               		   
               		  

};
/**
 * RECHERCHER ANCIEN ETUDIANTS
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
 * @returns
 */

app.controller('parametudiant', parametudiant);

 function parametudiant($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                		
					  $http.get("/listePeriode")
				      .then(function(response){
				              
				              $scope.listesemestres=response.data;
				              
				       });
					  
					  $http.get("/listeAnnee")
				      .then(function(response){
				              
				              $scope.listeannes=response.data;
				              
				       });
					  
					  $http.get("/listeParcours")
				      .then(function(response){
				              
				              $scope.listeparcours=response.data;
				              
				       });
					  
					  $scope.chargerinformation=function(){
				       $http.get("/getEtudiant")
					      .then(function(response){
					              
					              $scope.etudiants=response.data;
					              
					       });
					  }
					  $scope.chargerinformation();
					  
				       $scope.validerreinsciption=function(){
					  		$http.get("/reinscrirEtudiant?id="+$scope.parcours)
					  		.then(function(response){
					  			$scope.inscrir=response.data;
					  			 $scope.chargerinformation();
					  			var texte = 'Réinscription éffectué avec succes';
				  				 $scope.notifysuccess(texte);
					  		});
					  		 
					 }; 
					 
					 $scope.notifysuccess=function(texte){

		  				 new PNotify({
                             title: 'Umanager Etudiant ',
                             text: 'Vous êtes déjà inscrit dans cette année',
                             type: 'success',
                             styling: 'bootstrap3',
                             delay:2500,
                             history:false,
                             sticker:true
                              
                            });
					 }
					 
					 $scope.notifyerror=function(texte){

		  				 new PNotify({
                             title: 'Umanager Etudiant ',
                             text: texte,
                             type: 'error',
                             styling: 'bootstrap3',
                             delay:4000,
                             history:false,
                             sticker:true
                              
                            });
					 }
					 
					 $scope.notifywarning=function(texte){

		  				 new PNotify({
                             title: 'Umanager Etudiant ',
                             text: texte,
                             type: 'warning',
                             styling: 'bootstrap3',
                             delay:2500,
                             history:false,
                             sticker:true
                              
                            });
					 }
					 
					 $scope.verification=function(){
					  		$http.get("/verifierReinscription?id="+$scope.parcours)
					  		.then(function(response){
					  			$scope.actif = 0;
					  			if(response.data==false){
					  				$scope.actif = 1;
					  				var texte = 'Vous êtes déjà inscrit dans cette année';
					  				 $scope.notifyerror(texte);
					  		    }
					  			
					  	 })
					  		 
					 }; 
				       
					  $scope.chargernoteconsulter=function(){
				    		 $http.get("/listenoteperiode?id="+$scope.listesemestre+"&id1="+$scope.annee)
				    			.then(function(response){
				    				$scope.users2=response.data
			      			    $scope.usersTable2 = new NgTableParams({
			      				page: 1,
			      				count:10
			      				}, {
			      				total: $scope.users2.length,
			      				getData: function (params) {
			      				$scope.data2 = params.sorting() ? $filter('orderBy')($scope.users2, params.orderBy()) : $scope.users2;
			      				$scope.data2 = params.filter() ? $filter('filter')($scope.data2, params.filter()) : $scope.data2;
			      				$scope.data2 = $scope.data2.slice((params.page() - 1) * params.count(), params.page() * params.count());
			      				 
			      				return $scope.data2;
			      				// /$defer.resolve($scope.data);
			      				}
			      				}); 
			      		 
			      		 
			      		 
			         		});
			         		
			         	};
			         	
			         	 //LISTE UE VALIDER
			         	 $scope.chargeruevalider=function(){
				    		  $http.get("/listeuevalider")
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
				         	
				     //LISTE UE PROGRAMMER   
				         	
				         $http.get("/listePeriode")
				   		  .then(function(response){
				   			  $scope.listeperiodes=response.data;   	  
				   		 });
				         	 
                	$scope.chargerprog=function()
               		    {
               		            $http.get("/listeUeproposerparcours?id="+$scope.periodeliste)
               		                 .then(function(response){
               		                      $scope.users=response.data;	
               		                      $scope.usersTable = new NgTableParams({
               		                                    page: 1,
               		                                    count:10
               		                                    }, {
               		                                    total: $scope.users.length,
               		                                    getData: function (params) {
               		                                    $scope.data = params.sorting() ? $filter('orderBy')($scope.users, params.orderBy()) : $scope.users;
               		                                    $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
               		                                    $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
               		                                    return $scope.data;
               		                                    }
               		                                    }); 
               		                                
               		                               
               		                            });
               		    };
               		    
               	
                		
                		  

};
 


/** * GEstion des notes des etudiants*/

app.controller('EditableTableCtrl', function($scope, $filter, $http, $q) {

    function addCommas(nStr) {
	    nStr += '';
	    x = nStr.split(',');
	    x1 = x[0];
	    x2 = x.length > 1 ? ',' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	            x1 = x1.replace(rgx, '$1' + ' ' + '$2');
	    }
	    return x1 + x2;
	}

	 //Liste des parcours  
	 $http.get("/listeParcours")
			.then(function(response){
				$scope.listeparcours=response.data;
	  });

	 //Liste des pperiodes  
	 $http.get("/listePeriode")
			.then(function(response){
				$scope.listeperiodes=response.data;
	  });

	$scope.chargeretudiant=function(){	
		$http.get("/listeInscrir?id="+$scope.parcoursliste)
				.then(function(response){
					$scope.listeinscriptions=response.data;
	 			 	$scope.erreury=null;			
					
	  	});
	};

	$scope.chargerunite=function(id,id1){	
		$http.get("/listeUeProposePeriode?id="+id+"&id1="+id1)
				.then(function(response){
					
					$scope.listeues=response.data;		
					
	  	});
	};
	
	$scope.afficher2=function(){
	  		$http.get("/listaffichersaisi?id="+$scope.parcoursliste +"&id1="+$scope.etudiantes+"&id2="+$scope.periodeliste)
	  		.then(function(response){
	  			$scope.users=response.data;	
	  			$scope.test=$scope.users.length;
	  			$scope.erreury=null; 			
	  		});
	  		 
	 };  	
	
	$scope.afficher=function(){
		$http.get("/listaffichersaisiue?id="+$scope.parcoursliste +"&id1="+$scope.unite+"&id2="+$scope.periodeliste)
		.then(function(response){
			$scope.users=response.data;	
			$scope.test=$scope.users.length;
			$scope.erreury=null; 			
		});
		 
	};  	
	
  $scope.opened = {};
  $scope.open = function($event, elementOpened) 
  {
		   $event.preventDefault();
		   $event.stopPropagation();
		   $scope.opened[elementOpened] = !$scope.opened[elementOpened];
  };
  
  $scope.checkName = function(note, form) {   
		  if (note > 20)
		  {
			 var msg = "Username";  
			 form.$setError('devoirUeChoisie', msg);
			 return msg;  
	      } 
		  else {
				
		     form.$setError('composUeChoisie',"");
				
				}
	 }
	
	$scope.checkName2 = function(note) 
	{
			if (note>20) 
			{
			    return "note sur 20"
	        } 
					
	};
	
  
	$scope.filterUser = function(user) 
	{
		return user.isDeleted !== true;
	};

	$scope.deleteUser = function(id) {	
		   $http.delete("/supprimernoteel?idnote="+id).then(function(response){
							$scope.afficher();	
			});
	};
							
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
		  for (var i = $scope.users.length; i--;) 
		  {
			   var user = $scope.users[i];    
							// undelete
			   if (user.isDeleted)
			   {
					delete user.isDeleted;
			   }
							// remove new 
			   if (user.isNew) 
			   {
				    $scope.users.splice(i, 1);
			   }      
		  };
	 };

		  
		 // save edits
		 $scope.saveTable = function() {
		 var results = [];
		 $scope.erreury= [];
		 var text;
		 var typ=0;
		 var n ;
		    
		 for (var i = $scope.users.length; i--;) 
		 {
			 
			var user = $scope.users[i];
			
			if (user.devoirUeChoisie>20  || user.composUeChoisie>20)
			{
				
				if (user.devoirUeChoisie>20) {
				 n="Devoir "+"= "+user.devoirUeChoisie;
				}
				if (user.composUeChoisie>20) {
					n="Compos  "+"="+user.composUeChoisie;
				}
				
				text='L\'ue    '+user.uepropose.ue.codeUe+'  a une note > 20 :  '+n 	; 
		           
				
				
				
				
				typ=1;
		            
				    $scope.erreury.push(text);
					
			 }	 
		  }
	 
		  if (typ==0){
		    
		    for (var i = $scope.users.length; i--;)
		    {
					      var user = $scope.users[i];
					      
					      if (user.isDeleted) {
					        $scope.users.splice(i, 1);
					      }
					      
					      if (user.isNew) {
					        user.isNew = false;
					      }
					      
					      results.push($http.post('/addNoteUeChoisi', user));     
					        		      
						  $scope.erreur=null;
			}                  
					
						return $q.all(results);
			};
		  };
		  

})              


/**
 * CONTROLLEUR POUR LA GESTION DES ANNEES ACADEMIQUES
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
 * @returns tous les operation qui concerne les annees 
 */           

app.controller('parameannee', parameannee);

		   function parameannee($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
			
		   $scope.annee={};
		   $scope.listeannee={};
		   $scope.users;
		   
		   $http.get("/recupereAnnee")
           .then(function(response){
                   
                   $scope.an=response.data;
                   
            });
		   
		   $scope.chargerannee=function()
		    {
		            $http.get("/listeAnnee")
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
		                                $scope.annee=null;
		                                $scope.user.data=null;
		                            });
		    };
		    
		    $scope.chargerannee();
		    
		    $scope.user = {
		          data: []                            
		    }; 
		    
		    $scope.init=function(){
		          $scope.annee={};
		    }
                    
            $scope.showConfirm = function(event,id) {
                   var confirm = $mdDialog.confirm()
                   .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                   .textContent('Cet operation ne pourra plus être annuler')
                   .ariaLabel('UM Avertissement')
                   .targetEvent(event)
                   .ok('Oui')
                   .cancel('Non');
                        $mdDialog.show(confirm).then(function() {
                            $scope.supprimerAnnee(id);
                            $scope.status = 'Enregistrement supprimer avec succès';
                            }, function() {
                                $scope.status = 'Opération annulée';                     
                        });
             };$scope.regex = '^[a-zA-Z0-9._-]+$';
             
            
             
             $scope.validerannee=function()
             {
            		$http.post("/addAnnee",$scope.annee)
            		
            		.then(function(response){  		
            			$scope.annee=response.data; 			
            		    $scope.chargerannee();
            		    
            		    new PNotify({
                            title: 'Umanager notification ',
                            text:  'Opération éffectuée avec succes',
                            type: 'success',
                            styling: 'bootstrap3',
                            delay:2000,
                            history:false,
                            sticker:true
                             
                           });
            		    
            		 },function errorCallback(response){
            			 new PNotify({
                             title: 'Umanager error ',
                             text: 'Cette année existe déjà',
                             type: 'error',
                             styling: 'bootstrap3',
                             delay:2500,
                             history:false,
                             sticker:true
                              
                            });
            			 
            		 })
            	
             }
             
             $scope.modifierannee=function(id1){
                   $http.get("/updateAnnee?id="+id1)
                        .then(function(response){
                                
                                $scope.annee=response.data;
                                
                            });
             }    
              
             
             $scope.ActiveAnnee=function(id1){
                 $http.get("/ActiveAnnee?id1="+id1)
                      .then(function(response){
                              $scope.chargerannee();
                          });
             } 
             
        	
             
             $scope.supprimerAnnee=function(id){
                 $http.delete("/deleteAnnee?a="+id)
                 	  .then(function(response){
                         $scope.chargerannee();
                  },function errorCallback(response){
         			 new PNotify({
                         title: 'Umanager error ',
                         text: 'Cette année contient des informations',
                         type: 'error',
                         styling: 'bootstrap3',
                         delay:3000,
                         history:false,
                         sticker:true
                          
                        });
        			 
        		 })
             };


    };
                    

    
    /**
     * CONTROLLEUR POUR LA GESTION DES PERIODES 
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
     * @returns tous les operation qui concerne les periodes 
     */           

    app.controller('paramperiode', paramperiode);

    		   function paramperiode($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
    			
    		   $scope.periode={};
    		   $scope.listeperiode={};
    		   $scope.users;
    		   
    		   
    		   
    		   $scope.chargerperiode=function()
    		    {
    		            $http.get("/listePeriode")
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
    		                                $scope.periode=null;
    		                                $scope.user.data=null;
    		                            });
    		    };
    		    
    		    $scope.chargerperiode();
    		    
    		    $scope.user = {
    		          data: []                            
    		    }; 
    		    
    		    $scope.init=function(){
    		          $scope.periode={};
    		    }
                        
                $scope.showConfirm = function(event,id) {
                       var confirm = $mdDialog.confirm()
                       .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                       .textContent('Cet operation ne pourra plus être annuler')
                       .ariaLabel('UM Avertissement')
                       .targetEvent(event)
                       .ok('Oui')
                       .cancel('Non');
                            $mdDialog.show(confirm).then(function() {
                                $scope.supprimerperiode(id);
                                $scope.status = 'Enregistrement supprimer avec succès';
                                }, function() {
                                    $scope.status = 'Opération annulée';                     
                            });
                 };$scope.regex = '^[a-zA-Z0-9._-]+$';
                 
              
				 
                 $scope.validerperiode=function()
                 {
                		$http.post("/addPeriode",$scope.periode)
                		.then(function(response){  		
                			$scope.periode=response.data; 			
                		    $scope.chargerperiode();
                		    
                		    new PNotify({
                                title: 'Umanager Etudiant ',
                                text: 'Enrégistrement éffectué avec succès',
                                type: 'success',
                                styling: 'bootstrap3',
                                delay:2500,
                                history:false,
                                sticker:true
                                 
                               });
                		    
                		},function errorCallback(response){
            			 new PNotify({
                             title: 'Umanager error ',
                             text: 'Cette période existe déjà',
                             type: 'error',
                             styling: 'bootstrap3',
                             delay:2500,
                             history:false,
                             sticker:true
                              
                            });
                		})	;
               	    	
                 }
                 
                 $scope.modifierperiode=function(id1){
                       $http.get("/updatePeriode?id="+id1)
                            .then(function(response){
                                    
                                    $scope.periode=response.data;
                                    
                                });
                 }    
                  
                 $scope.Activerperiode=function(id1){
                     $http.get("/ActivePeriode?p="+id1)
                          .then(function(response){
                                  $scope.chargerperiode();
                              });
                 } 
                 


   		      $scope.message=function()
   				{
   						setInterval(function(){
   								var status= document.getElementById("msg");
   								status.innerHTML="";

   							},5000);
   				 }
   		      
                 
                 $scope.supprimerperiode=function(id){
                     $http.delete("/deletePeriode?p="+id)
                     	  .then(function(response){
                             $scope.chargerperiode();
                             $scope.message();
                      });
                 };


        };
                    
            
        /**
         * CONTROLLEUR POUR LA GESTION DES PROFESSIONS 
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
         * @returns tous les operation qui concerne les professions
         */           

        app.controller('paramprofession', paramprofession);

        		   function paramprofession($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
        			
        		   $scope.profession={};
        		   $scope.listeprofession={};
        		   $scope.users;
        		   
        		   
        		   
        		   $scope.chargerprofession=function()
        		    {
        		            $http.get("/listeProfession")
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
        		                                $scope.profession=null;
        		                                $scope.user.data=null;
        		                            });
        		    };
        		    
        		    $scope.chargerprofession();
        		    
        		    $scope.user = {
        		          data: []                            
        		    }; 
        		    
        		    $scope.init=function(){
        		          $scope.profession={};
        		    }
                            
                    $scope.showConfirm = function(event,id) {
                           var confirm = $mdDialog.confirm()
                           .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                           .textContent('Cet operation ne pourra plus être annuler')
                           .ariaLabel('UM Avertissement')
                           .targetEvent(event)
                           .ok('Oui')
                           .cancel('Non');
                                $mdDialog.show(confirm).then(function() {
                                    $scope.supprimerprofession(id);
                                    $scope.status = 'Enregistrement supprimer avec succès';
                                    }, function() {
                                        $scope.status = 'Opération annulée';                     
                                });
                     };$scope.regex = '^[a-zA-Z0-9._-]+$';
                     
                     $scope.validerprofession=function()
                     {
                    		$http.post("/addProfession",$scope.profession)
                    		.then(function(response){  		
                    			$scope.profession=response.data; 			
                    		    $scope.chargerprofession();
                    			new PNotify({
                                    title: 'Umanager notification ',
                                    text:  'Opération éffectuée avec succes',
                                    type: 'success',
                                    styling: 'bootstrap3',
                                    delay:2000,
                                    history:false,
                                    sticker:true
                                     
                                   });
                    		    
                    		 },function errorCallback(response){
                    			 new PNotify({
                                     title: 'Umanager error ',
                                     text: 'Cette profesion existe déjà',
                                     type: 'error',
                                     styling: 'bootstrap3',
                                     delay:2500,
                                     history:false,
                                     sticker:true
                                      
                                    });
                    			 
                    		 })
                   	    	
                     }
                     
                     $scope.modifierprofession=function(id1){
                           $http.get("/updateProfession?id="+id1)
                                .then(function(response){
                                        
                                        $scope.profession=response.data;
                                        
                                    });
                     }    
                      
                     
                    $scope.supprimerprofession=function(id){
                         $http.delete("/deleteProfession?id="+id)
                         	  .then(function(response){
                                 $scope.chargerprofession();
                          });
                     };


            };
              
           
            /**
             * CONTROLLEUR POUR LA GESTION DES CONGREGATONS 
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
             * @returns tous les operation qui concerne les congregations
             */           

            app.controller('paramcongregation', paramcongregation);

            		   function paramcongregation($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
            			
            		   $scope.congregation={};
            		   $scope.listecongregation={};
            		   $scope.users;
            		   
            		   
            		   
            		   $scope.chargercongregation=function()
            		    {
            		            $http.get("/listeCongregation")
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
            		                                $scope.congregation=null;
            		                                $scope.user.data=null;
            		                            });
            		    };
            		    
            		    $scope.chargercongregation();
            		    
            		    $scope.user = {
            		          data: []                            
            		    }; 
            		    
            		    $scope.init=function(){
            		          $scope.congregation={};
            		    }
                                
                        $scope.showConfirm = function(event,id) {
                               var confirm = $mdDialog.confirm()
                               .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                               .textContent('Cet operation ne pourra plus être annuler')
                               .ariaLabel('UM Avertissement')
                               .targetEvent(event)
                               .ok('Oui')
                               .cancel('Non');
                                    $mdDialog.show(confirm).then(function() {
                                        $scope.supprimercongregation(id);
                                        $scope.status = 'Enregistrement supprimer avec succès';
                                        }, function() {
                                            $scope.status = 'Opération annulée';                     
                                    });
                         };$scope.regex = '^[a-zA-Z0-9._-]+$';
                         
                         $scope.validercongregation=function()
                         {
                        		$http.post("/addCongregation",$scope.congregation)
                        		.then(function(response){  		
                        			$scope.congregation=response.data; 			
                        		    $scope.chargercongregation();
                        		    
                        		    new PNotify({
                                        title: 'Umanager notification ',
                                        text:  'Opération éffectuée avec succes',
                                        type: 'success',
                                        styling: 'bootstrap3',
                                        delay:2000,
                                        history:false,
                                        sticker:true
                                         
                                       });
                        		    
                        		 },function errorCallback(response){
                        			 new PNotify({
                                         title: 'Umanager error ',
                                         text: 'Cette congrégation existe déjà',
                                         type: 'error',
                                         styling: 'bootstrap3',
                                         delay:2500,
                                         history:false,
                                         sticker:true
                                          
                                        });
                        			 
                        		 })
                       	    	
                       	    	
                         }
                         
                         $scope.modifiercongregation=function(id1){
                               $http.get("/updateCongregation?id="+id1)
                                    .then(function(response){
                                            
                                            $scope.congregation=response.data;
                                            
                                        });
                         }    
                          
                         
                        $scope.supprimercongregation=function(id){
                             $http.delete("/deleteCongregation?id="+id)
                             	  .then(function(response){
                                     $scope.chargercongregation();
                              });
                         }


                };
                      
 
/**
* CONTROLLEUR POUR LA GESTION DES TITRES
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
* @returns tous les operation qui concerne les titres
*/           

app.controller('paramtitre', paramtitre);

      function paramtitre($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                			
                		   $scope.titre={};
                		   $scope.listetitre={};
                		   $scope.users;
                		   
                		   
                		   $scope.chargertitre=function()
                		    {
                		            $http.get("/listeTitre")
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
                		                                $scope.titre=null;
                		                                $scope.user.data=null;
                		                            });
                		    };
                		    
                		    $scope.chargertitre();
                		    
                		    $scope.user = {
                		          data: []                            
                		    }; 
                		    
                		    $scope.init=function(){
                		          $scope.titre={};
                		    }
                                    
                            $scope.showConfirm = function(event,id) {
                                   var confirm = $mdDialog.confirm()
                                   .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                   .textContent('Cet operation ne pourra plus être annuler')
                                   .ariaLabel('UM Avertissement')
                                   .targetEvent(event)
                                   .ok('Oui')
                                   .cancel('Non');
                                        $mdDialog.show(confirm).then(function() {
                                            $scope.supprimertitre(id);
                                            $scope.status = 'Enregistrement supprimer avec succès';
                                            }, function() {
                                                $scope.status = 'Opération annulée';                     
                                        });
                             };$scope.regex = '^[a-zA-Z0-9._-]+$';
                             
                             $scope.validertitre=function()
                             {
                            		$http.post("/addTitre",$scope.titre)
                            		.then(function(response){  		
                            			$scope.titre=response.data; 			
                            		    $scope.chargertitre();
                            		    
                            		    new PNotify({
                                            title: 'Umanager notification ',
                                            text:  'Opération éffectuée avec succes',
                                            type: 'success',
                                            styling: 'bootstrap3',
                                            delay:2000,
                                            history:false,
                                            sticker:true
                                             
                                           });
                            		    
                            		 },function errorCallback(response){
                            			 new PNotify({
                                             title: 'Umanager error ',
                                             text: 'Ce titre existe déjà',
                                             type: 'error',
                                             styling: 'bootstrap3',
                                             delay:2500,
                                             history:false,
                                             sticker:true
                                              
                                            });
                            			 
                            		 })
                           	    	
                           	    	
                             }
                             
                             $scope.modifiertitre=function(id1){
                                   $http.get("/updateTitre?id="+id1)
                                        .then(function(response){
                                                
                                                $scope.titre=response.data;
                                                
                                            });
                             }    
                              
                             
                            $scope.supprimertitre=function(id){
                                 $http.delete("/deleteTitre?id1="+id)
                                 	  .then(function(response){
                                         $scope.chargertitre();
                                  });
                             }


                    };
                          
     
                    /**
                     * CONTROLLEUR POUR LA GESTION DES ATTRIBUTIONNS
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
                     * @returns tous les operation qui concerne les attribution 
                     */           

                    app.controller('paramattribution', paramattribution);

                    		   function paramattribution($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                    			
                    		   $scope.attribution={};
                    		   $scope.listeattribution={};
                    		   $scope.users;
                    		   
                    		   $http.get("/listeParcours2")
                               .then(function(response){
                                       
                                       $scope.listeparcours=response.data;
                                       
                                });
                    		   
                    		  $scope.chargermotif=function(id){
	                    		   $http.get("/listeFraisParcours?idp="+id)
	                               .then(function(response){
	                                       
	                                       $scope.listefrais=response.data;
	                                       
	                                });
                    		  }
                    		  
                    		  
                    		   $scope.chargeretudiant=function(){
	                    		   $http.get("/listeInscrir?id="+$scope.parcours)
	                               .then(function(response){
	                                       $scope.inscrire=response.data;
	                                });
                    		   }
                    		   
                    		   $scope.chargerattribution=function()
                    		    {
                    		            $http.get("/listeAttribPerso?id="+$scope.attribution.inscription.idInscription)
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
                    		                                $scope.attribution.montant=null;
                    		                                $scope.user.data=null
                    		                            });
                    		    };
                    		    
                    		    
                    		    
                    		    $scope.user = {
                    		          data: []                            
                    		    }; 
                    		    
                    		    $scope.init=function(){
                    		          $scope.attribution={};
                    		    }
                                        
                                $scope.showConfirm = function(event,id) {
                                       var confirm = $mdDialog.confirm()
                                       .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                       .textContent('Cet operation ne pourra plus être annuler')
                                       .ariaLabel('UM Avertissement')
                                       .targetEvent(event)
                                       .ok('Oui')
                                       .cancel('Non');
                                            $mdDialog.show(confirm).then(function() {
                                                $scope.supprimerattribution(id);
                                                $scope.status = 'Enregistrement supprimer avec succès';
                                                }, function() {
                                                    $scope.status = 'Opération annulée';                     
                                            });
                                 };$scope.regex = '^[a-zA-Z0-9._-]+$';
                                 
                                 $scope.validerattribution=function()
                                 {
                                		$http.post("/addAttribPerso",$scope.attribution)
                                		.then(function(response){  		
                                			//$scope.attribution=response.data; 			
                                		    $scope.chargerattribution();
                                	
                                		    new PNotify({
                                                title: 'Umanager notification ',
                                                text:  'Opération éffectuée avec succes',
                                                type: 'success',
                                                styling: 'bootstrap3',
                                                delay:2000,
                                                history:false,
                                                sticker:true
                                                 
                                               });
                                		    
                                		 },function errorCallback(response){
                                			 new PNotify({
                                                 title: 'Umanager error ',
                                                 text: 'Cette attribution existe déjà',
                                                 type: 'error',
                                                 styling: 'bootstrap3',
                                                 delay:2500,
                                                 history:false,
                                                 sticker:true
                                                  
                                                });
                                			 
                                		 })
                               	    	
                                 }
                                 
                                 $scope.modifierattribution=function(id1){
                                       $http.get("/updateAttribPerso?id="+id1)
                                            .then(function(response){
                                                    
                                            	   // alert(response.data.inscription.idInscription);
                                                    $scope.attribution=response.data;
                                                   // $scope.attribution.inscription.idInscription="'"+response.data.inscription.idInscription+"'"; 
                                                    
                                                    
                                                });
                                 }    
                                  
                             
                                 
                                 $scope.supprimerattribution=function(id){
                                     $http.delete("/deleteAttribPerso?id="+id)
                                     	  .then(function(response){
                                             $scope.chargerattribution();
                                      });
                                 };


                        };
                            
                        /**
                         * CONTROLLEUR POUR LA GESTION DES ATTRIBUTIONNS SPECIAL
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
                         * @returns tous les operation qui concerne les attribution 
                         */           

                        app.controller('paramattributionspecial', paramattributionspecial);

                        		   function paramattributionspecial($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                        			
                        		   $scope.atributionspecial={};
                        		   $scope.listeattributionspecial={};
                        		   $scope.users;
                        		   
                        		   $http.get("/listeParcours")
                                   .then(function(response){
                                           
                                           $scope.listeparcours=response.data;
                                           
                                    });
                        		   
    	                    		   $http.get("/listePeriode")
    	                               .then(function(response){
    	                                       
    	                                       $scope.listeperiodes=response.data;
    	                                       
    	                                });
                        		  
                        		  
                        		   $scope.chargeretudiant=function(){
    	                    		   $http.get("/listeInscrir?id="+$scope.atributionspecial.parcours.idParcours)
    	                               .then(function(response){
    	                                       $scope.listeinscriptions=response.data;
    	                                });
                        		   }
                        		   
                        		   $scope.chargerattributionspecial=function()
                        		    {
                        		            $http.get("/listeAutorisationSpecial")
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
                        		                                $scope.atributionspecial=null;
                        		                                $scope.user.data=null
                        		                            });
                        		    };
                        		    
                        		    $scope.chargerattributionspecial();

                        		    
                        		    $scope.user = {
                        		          data: []                            
                        		    }; 
                        		    
                        		    $scope.init=function(){
                        		          $scope.atributionspecial={};
                        		    }
                                            
                                    $scope.showConfirm = function(event,id) {
                                           var confirm = $mdDialog.confirm()
                                           .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                           .textContent('Cet operation ne pourra plus être annuler')
                                           .ariaLabel('UM Avertissement')
                                           .targetEvent(event)
                                           .ok('Oui')
                                           .cancel('Non');
                                                $mdDialog.show(confirm).then(function() {
                                                    $scope.supprimerattributionspecial(id);
                                                    $scope.status = 'Enregistrement supprimer avec succès';
                                                    }, function() {
                                                        $scope.status = 'Opération annulée';                     
                                                });
                                     };$scope.regex = '^[a-zA-Z0-9._-]+$';
                                     
                                     $scope.validerattribution=function()
                                     {
                                    		$http.post("/addAutorisationSpecial",$scope.atributionspecial)
                                    		.then(function(response){  		
                                    			//$scope.attribution=response.data; 			
                                    		    $scope.chargerattributionspecial();
                                    	
                                    		    new PNotify({
                                                    title: 'Umanager notification ',
                                                    text:  'Opération éffectuée avec succes',
                                                    type: 'success',
                                                    styling: 'bootstrap3',
                                                    delay:2000,
                                                    history:false,
                                                    sticker:true
                                                     
                                                   });
                                    		    
                                    		 },function errorCallback(response){
                                    			 new PNotify({
                                                     title: 'Umanager error ',
                                                     text: 'Cette autorisation speciale existe déjà',
                                                     type: 'error',
                                                     styling: 'bootstrap3',
                                                     delay:2500,
                                                     history:false,
                                                     sticker:true
                                                      
                                                    });
                                    			 
                                    		 })
                                   	    	
                                     }
                                     
                                     $scope.modifierattributionspecial=function(id1){
                                           $http.get("/updateAutorisationSpecial?id="+id1)
                                                .then(function(response){
                                                        $scope.atributionspecial=response.data;
                                                         
                                                    });
                                     }    
                                      
                                 
                                     
                                     $scope.supprimerattributionspecial=function(id){
                                         $http.delete("/deleteAutorisationSpecial?id="+id)
                                         	  .then(function(response){
                                                 $scope.chargerattributionspecial();
                                          });
                                     };


                            };
                                          

                    /**
                    * CONTROLLEUR POUR LA GESTION DES DOMAINES
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
                    * @returns tous les operation qui concerne les domaines
                    */           

app.controller('paramdomaine', paramdomaine);

     function paramdomaine($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                                    			
            $scope.domaine={};
            $scope.listedomaine={};
            $scope.users;
                                    		   
				            $scope.chargerdomaine=function()
				            {
				                   $http.get("/listeDomaine")
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
				                                    		      $scope.domaine=null;
				                                    		      $scope.user.data=null;
				                                      });
				                               };
                                    		    
                                    		    $scope.chargerdomaine();
                                    		    
                                    		    $scope.user = {
                                    		          data: []                            
                                    		    }; 
                                    		    
                                    		    $scope.init=function(){
                                    		          $scope.domaine={};
                                    		    }
                                                        
                                                $scope.showConfirm = function(event,id) {
                                                       var confirm = $mdDialog.confirm()
                                                       .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                                       .textContent('Cet operation ne pourra plus être annuler')
                                                       .ariaLabel('UM Avertissement')
                                                       .targetEvent(event)
                                                       .ok('Oui')
                                                       .cancel('Non');
                                                            $mdDialog.show(confirm).then(function() {
                                                                $scope.supprimerdomaine(id);
                                                                $scope.status = 'Enregistrement supprimer avec succès';
                                                                }, function() {
                                                                    $scope.status = 'Opération annulée';                     
                                                            });
                                                 };$scope.regex = '^[a-zA-Z0-9._-]+$';
                                                 
                                                 $scope.validerdomaine=function()
                                                 {
                                                		$http.post("/addDomaine",$scope.domaine)
                                                		.then(function(response){  		
                                                			$scope.domaine=response.data; 			
                                                		    $scope.chargerdomaine();
                                                		    
                                                		    new PNotify({
                                                                title: 'Umanager notification ',
                                                                text:  'Opération éffectuée avec succes',
                                                                type: 'success',
                                                                styling: 'bootstrap3',
                                                                delay:2000,
                                                                history:false,
                                                                sticker:true
                                                                 
                                                               });
                                                		    
                                                		 },function errorCallback(response){
                                                			 new PNotify({
                                                                 title: 'Umanager error ',
                                                                 text: 'Ce domaine existe déjà',
                                                                 type: 'error',
                                                                 styling: 'bootstrap3',
                                                                 delay:2500,
                                                                 history:false,
                                                                 sticker:true
                                                                  
                                                                });
                                                			 
                                                		 })
                                               	    	
                                                			
                                               	    	
                                                 }
                                                 
                                                 $scope.modifierdomaine=function(id1){
                                                       $http.get("/updateDomaine?id="+id1)
                                                            .then(function(response){
                                                                    
                                                                    $scope.domaine=response.data;
                                                                    
                                                                });
                                                 }    
                                                  
                                                 
                                                $scope.supprimerdomaine=function(id){
                                                     $http.delete("/deleteDomaine?id="+id)
                                                     	  .then(function(response){
                                                             $scope.chargerdomaine();
                                                      });
                              }


               };
                           
        
               /**
                * CONTROLLEUR POUR LA GESTION DES SERIES
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
                * @returns tous les operation qui concerne les series
                */           

app.controller('paramserie', paramserie);

 function paramserie($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                                			
        $scope.serie={};
        $scope.listeserie={};
        $scope.users;
                                		   
			            $scope.chargerserie=function()
			            {
			                   $http.get("/listeSerie")
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
			                                    		      $scope.serie=null;
			                                    		      $scope.user.data=null;
			                                      });
			                               };
                                		    
                                		    $scope.chargerserie();
                                		    
                                		    $scope.user = {
                                		          data: []                            
                                		    }; 
                                		    
                                		    $scope.init=function(){
                                		          $scope.serie={};
                                		    }
                                                    
                                            $scope.showConfirm = function(event,id) {
                                                   var confirm = $mdDialog.confirm()
                                                   .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                                   .textContent('Cet operation ne pourra plus être annuler')
                                                   .ariaLabel('UM Avertissement')
                                                   .targetEvent(event)
                                                   .ok('Oui')
                                                   .cancel('Non');
                                                        $mdDialog.show(confirm).then(function() {
                                                            $scope.supprimerserie(id);
                                                            $scope.status = 'Enregistrement supprimer avec succès';
                                                            }, function() {
                                                                $scope.status = 'Opération annulée';                     
                                                        });
                                             };$scope.regex = '^[a-zA-Z0-9._-]+$';
                                             
                                             $scope.validerserie=function()
                                             {
                                            		$http.post("/addSerie",$scope.serie)
                                            		.then(function(response){  		
                                            			$scope.serie=response.data; 			
                                            		    $scope.chargerserie();
                                            		    
                                            		    new PNotify({
                                                            title: 'Umanager notification ',
                                                            text:  'Opération éffectuée avec succes',
                                                            type: 'success',
                                                            styling: 'bootstrap3',
                                                            delay:2000,
                                                            history:false,
                                                            sticker:true
                                                             
                                                           });
                                            		    
                                            		 },function errorCallback(response){
                                            			 new PNotify({
                                                             title: 'Umanager error ',
                                                             text: 'Cette serie  existe déjà',
                                                             type: 'error',
                                                             styling: 'bootstrap3',
                                                             delay:2500,
                                                             history:false,
                                                             sticker:true
                                                              
                                                            });
                                            			 
                                            		 })
                                           	    	
                                           	    	
                                             }
                                             
                                             $scope.modifierserie=function(id1){
                                                   $http.get("/updateSerie?id="+id1)
                                                        .then(function(response){
                                                                
                                                                $scope.serie=response.data;
                                                                
                                                            });
                                             }    
                                              
                                             
                                            $scope.supprimerserie=function(id){
                                                 $http.delete("/deleteSerie?id="+id)
                                                 	  .then(function(response){
                                                         $scope.chargerserie();
                                                  });
                          }


           };
                                                                  	
     
           
           /**
            * CONTROLLEUR POUR LA GESTION DES MENSUALITES
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
            * @returns tous les operation qui concerne les mensualites
            */           

app.controller('parammensualite', parammensualite);

function parammensualite($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                            			
    $scope.mensualite={};
    $scope.listemensualite={};
    $scope.users;
                            		   
		            $scope.chargermensualite=function()
		            {
		                   $http.get("/listeMensualite")
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
		                                    		      $scope.mensualite=null;
		                                    		      $scope.user.data=null;
		                                      });
		                               };
                            		    
                            		    $scope.chargermensualite();
                            		    
                            		    $scope.user = {
                            		          data: []                            
                            		    }; 
                            		    
                            		    $scope.init=function(){
                            		          $scope.mensualite={};
                            		    }
                                                
                                        $scope.showConfirm = function(event,id) {
                                               var confirm = $mdDialog.confirm()
                                               .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                               .textContent('Cet operation ne pourra plus être annuler')
                                               .ariaLabel('UM Avertissement')
                                               .targetEvent(event)
                                               .ok('Oui')
                                               .cancel('Non');
                                                    $mdDialog.show(confirm).then(function() {
                                                        $scope.supprimermensualite(id);
                                                        $scope.status = 'Enregistrement supprimer avec succès';
                                                        }, function() {
                                                            $scope.status = 'Opération annulée';                     
                                                    });
                                         };$scope.regex = '^[a-zA-Z0-9._-]+$';
                                         
                                         $scope.validermensualite=function()
                                         {
                                        		$http.post("/addMensualite",$scope.mensualite)
                                        		.then(function(response){  		
                                        			$scope.mensualite=response.data; 			
                                        		    $scope.chargermensualite();
                                        		    
                                        		    
                                        		    new PNotify({
                                                        title: 'Umanager notification ',
                                                        text:  'Opération éffectuée avec succes',
                                                        type: 'success',
                                                        styling: 'bootstrap3',
                                                        delay:2000,
                                                        history:false,
                                                        sticker:true
                                                         
                                                       });
                                        		    
                                        		 },function errorCallback(response){
                                        			 new PNotify({
                                                         title: 'Umanager error ',
                                                         text: 'Cette mentionalité  existe déjà',
                                                         type: 'error',
                                                         styling: 'bootstrap3',
                                                         delay:2500,
                                                         history:false,
                                                         sticker:true
                                                          
                                                        });
                                        			 
                                        		 })
                                       	    	
                                        			
                                       	    	
                                         }
                                         
                                         $scope.modifiermensualite=function(id1){
                                               $http.get("/updateMensualite?id="+id1)
                                                    .then(function(response){
                                                            
                                                            $scope.mensualite=response.data;
                                                            
                                                        });
                                         }    
                                          
                                         
                                        $scope.supprimermensualite=function(id){
                                             $http.delete("/deleteMensualite?id="+id)
                                             	  .then(function(response){
                                                     $scope.chargermensualite();
                                              });
                      }


       };
                                                              	
               
 
       /**
        * CONTROLLEUR POUR LA GESTION DES SPECIALITES
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
        * @returns tous les operation qui concerne les specialites
        */           

app.controller('paramspecialite', paramspecialite);

function paramspecialite($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                        			
$scope.specialite={};
$scope.listespecialite={};
$scope.users;
                        		   
	            $scope.chargerspecialite=function()
	            {
	                   $http.get("/listeSpecialite")
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
	                                    		      $scope.specialite=null;
	                                    		      $scope.user.data=null;
	                                      });
	                               };
                        		    
                        		    $scope.chargerspecialite();
                        		    
                        		    $scope.user = {
                        		          data: []                            
                        		    }; 
                        		    
                        		    $scope.init=function(){
                        		          $scope.specialite={};
                        		    }
                                            
                                    $scope.showConfirm = function(event,id) {
                                           var confirm = $mdDialog.confirm()
                                           .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                           .textContent('Cet operation ne pourra plus être annuler')
                                           .ariaLabel('UM Avertissement')
                                           .targetEvent(event)
                                           .ok('Oui')
                                           .cancel('Non');
                                                $mdDialog.show(confirm).then(function() {
                                                    $scope.supprimespecialite(id);
                                                    $scope.status = 'Enregistrement supprimer avec succès';
                                                    }, function() {
                                                        $scope.status = 'Opération annulée';                     
                                                });
                                     };$scope.regex = '^[a-zA-Z0-9._-]+$';
                                     
                                     $scope.validerspecialite=function()
                                     {
                                    		$http.post("/addSpecialite",$scope.specialite)
                                    		.then(function(response){  		
                                    			$scope.specialite=response.data; 			
                                    		    $scope.chargerspecialite();
                                    		    
                                    		});
                                    			
                                   	    	
                                     }
                                     
                                     $scope.modifierspecialite=function(id1){
                                           $http.get("/updateSpecialite?id="+id1)
                                                .then(function(response){
                                                        
                                                        $scope.specialite=response.data;
                                                        
                                                    });
                                     }    
                                      
                                     
                                    $scope.supprimerspecialite=function(id){
                                         $http.delete("/deleteSpecialite?id="+id)
                                         	  .then(function(response){
                                                 $scope.chargerspecialite();
                                          });
                  }


   };
                                                          	
  
   
   /**
    * CONTROLLEUR POUR LA GESTION DES MENTION BAC
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
    * @returns tous les operation qui concerne les mentionbacs
    */           

   app.controller('parammentionbac', parammentionbac);

   		   function parammentionbac($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
   			
   		   $scope.mentionbac={};
   		   $scope.listementionbac={};
   		   $scope.users;
   		   
   		   
   		   
   		   $scope.chargermentionbac=function()
   		    {
   		            $http.get("/listeMentionBac")
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
   		                                $scope.mentionbac=null;
   		                                $scope.user.data=null;
   		                            });
   		    };
   		    
   		    $scope.chargermentionbac();
   		    
   		    $scope.user = {
   		          data: []                            
   		    }; 
   		    
   		    $scope.init=function(){
   		          $scope.mentionbac={};
   		    }
                       
               $scope.showConfirm = function(event,id) {
                      var confirm = $mdDialog.confirm()
                      .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                      .textContent('Cet operation ne pourra plus être annuler')
                      .ariaLabel('UM Avertissement')
                      .targetEvent(event)
                      .ok('Oui')
                      .cancel('Non');
                           $mdDialog.show(confirm).then(function() {
                               $scope.supprimermentionbac(id);
                               $scope.status = 'Enregistrement supprimer avec succès';
                               }, function() {
                                   $scope.status = 'Opération annulée';                     
                           });
                };$scope.regex = '^[a-zA-Z0-9._-]+$';
                
                $scope.validermentionbac=function()
                {
               		$http.post("/addMentionBac",$scope.mentionbac)
               		.then(function(response){  		
               			$scope.mentionbac=response.data; 			
               		    $scope.chargermentionbac();
               		    
               		   
            		    new PNotify({
                            title: 'Umanager notification ',
                            text:  'Opération éffectuée avec succes',
                            type: 'success',
                            styling: 'bootstrap3',
                            delay:2000,
                            history:false,
                            sticker:true
                             
                           });
            		    
            		 },function errorCallback(response){
            			 new PNotify({
                             title: 'Umanager error ',
                             text: 'Cette mention BAC  existe déjà',
                             type: 'error',
                             styling: 'bootstrap3',
                             delay:2500,
                             history:false,
                             sticker:true
                              
                            });
            			 
            		 })
           	    	
               			
              	    	
                }
                
                $scope.modifiermentionbac=function(id1){
                      $http.get("/updateMentionBac?id="+id1)
                           .then(function(response){
                                   
                                   $scope.mentionbac=response.data;
                                   
                               });
                }    
                 
            
                $scope.supprimermentionbac=function(id){
                    $http.delete("/deleteMentionBac?id="+id)
                    	  .then(function(response){
                            $scope.chargermentionbac();
                     });
                };


       };

       
       
/*** @returns tous les operation qui concerne les mentions*/           

app.controller('paramusers', paramusers);

    function paramusers($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                        			
    $scope.utilisateur={};
    $scope.users;

			    $http.get("/listeRole")
				    .then(function(response){
				     $scope.listeroles=response.data;
			    });

                $scope.chargerusers=function()
                {
                       $http.get("/listeUser")
                                 .then(function(response){
                                  $scope.users=response.data;	
                                        $scope.usersTable = new NgTableParams({
                                        		      page: 1,
                                        		      count:10
                                        		      }, {
                                        		      total: $scope.users.length,
                                        		      getData: function (params) {
                                        		      $scope.data = params.sorting() ? $filter('orderBy')($scope.users, params.orderBy()) : $scope.users;
                                        		      $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                                        		      $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                                        		      return $scope.data;
                                        		      }
                                        		 }); 
                                        		      $scope.utilisateur=null;
                                        		      $scope.user.data=null;
                                          });
                                   };
                        		    
                        		    $scope.chargerusers();
                        		    
                        		    $scope.user = {
                        		          data: []                            
                        		    }; 
                        		    
                        		    $scope.init=function(){
                        		          $scope.utilisateur={};
                        		    }
                                            
                                   
                                     
                                     $scope.validerusers=function()
                                     {
                                    		$http.post("/addUser",$scope.utilisateur)
                                    		.then(function(response){  		
                                    			$scope.utilisateur=response.data; 			
                                    		    
                                    		    username=$scope.utilisateur.username;
                                    		    
                                            	$http.post("/addRoleToUser2?username="+username+"&role="+$scope.role)
                                    		    $scope.chargerusers();
                                    		    new PNotify({
                                                    title: 'Umanager notification ',
                                                    text:  'Enrégistrement éffectuée avec succes',
                                                    type: 'success',
                                                    styling: 'bootstrap3',
                                                    delay:2000,
                                                    history:false,
                                                    sticker:true
                                                     
                                                   });
                                    		    
                                    		 },function errorCallback(response){
                                    			 new PNotify({
                                                     title: 'Umanager error ',
                                                     text: 'Cette utilisateur existe déjà',
                                                     type: 'error',
                                                     styling: 'bootstrap3',
                                                     delay:2500,
                                                     history:false,
                                                     sticker:true
                                                      
                                                    });
                                    			 
                                    		 })
                                   	    	
                                    			
                                   	    	
                                     }
                                     
                                     $scope.modifieruser=function(id1){
                                           $http.get("/updateMention?id="+id1)
                                                .then(function(response){
                                                        
                                                        $scope.utilisateur=response.data;
                                                        
                                                    });
                                     }    
                  
                                 	$scope.activerprofil=function(id){ 
                       	    		 $http.get("/activerprofil?u="+id)
                       	    			.then(function(response){
                       	    			 
                       	    				$scope.chargerusers()
                       	    				 
                       	    			});
                       	    		 
                       		       	};
                       		       	
                       		         $scope.desactiverprofil=function(id){ 
                       						$http.get("/desactiverprofil?u="+id)
                       							.then(function(response){
                       							
                       								$scope.chargerusers()
                       								
                       							});
                       		    		 
                       			       	};
                       			       	
                       			       	$scope.activertout=function(id){ 
                       			    		 $http.get("/activerprofiltout")
                       			    			.then(function(response){
                       			    			 
                       			    				$scope.chargerusers()
                       			    				 
                       			    			});
                       			    		 
                       				    };
                       				       	
                       				       	
                       				    $scope.desactivertout=function(id){ 
                       				    		 $http.get("/desactiverprofiltout")
                       				    			.then(function(response){
                       				    			 
                       				    				$scope.chargerusers()
                       				    				 
                       				    			});
                       				    		 
                       					};
                       					
                       				    $scope.showConfirmactiver = function(event,id) {
                                            var confirm = $mdDialog.confirm()
                                            .title('Etes-vous sur de vouloir activer tout les utilisateurs,')
                                            .textContent('Cet operation ne pourra plus être annuler')
                                            .ariaLabel('UM Avertissement')
                                            .targetEvent(event)
                                            .ok('Oui')
                                            .cancel('Non');
                                                 $mdDialog.show(confirm).then(function() {
                                                     $scope.activertout(id);
                                                     $scope.status = 'Activation éffectuer avec succès';
                                                     }, function() {
                                                         $scope.status = 'Opération annulée';                     
                                                 });
                                      };
                                      
                                      $scope.showConfirmdesactiver = function(event,id) {
                                          var confirm = $mdDialog.confirm()
                                          .title('Etes-vous sur de vouloir désactiver tout les utilisateurs,')
                                          .textContent('Cet operation ne pourra plus être annuler')
                                          .ariaLabel('UM Avertissement')
                                          .targetEvent(event)
                                          .ok('Oui')
                                          .cancel('Non');
                                               $mdDialog.show(confirm).then(function() {
                                                   $scope.desactivertout(id);
                                                   $scope.status = 'Désactiver éffectuer avec succès';
                                                   }, function() {
                                                       $scope.status = 'Opération annulée';                     
                                               });
                                    };


    };
   
   /**
    * CONTROLLEUR POUR LA GESTION DES MENTIONS
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
    * @returns tous les operation qui concerne les mentions
    */           

app.controller('parammention', parammention);

function parammention($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                    			
$scope.mention={};
$scope.listemention={};
$scope.users;


            $scope.chargermention=function()
            {
                   $http.get("/listeMention")
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
                                    		      $scope.mention=null;
                                    		      $scope.user.data=null;
                                      });
                               };
                    		    
                    		    $scope.chargermention();
                    		    
                    		    $scope.user = {
                    		          data: []                            
                    		    }; 
                    		    
                    		    $scope.init=function(){
                    		          $scope.mention={};
                    		    }
                                        
                                $scope.showConfirm = function(event,id) {
                                       var confirm = $mdDialog.confirm()
                                       .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                       .textContent('Cet operation ne pourra plus être annuler')
                                       .ariaLabel('UM Avertissement')
                                       .targetEvent(event)
                                       .ok('Oui')
                                       .cancel('Non');
                                            $mdDialog.show(confirm).then(function() {
                                                $scope.supprimermention(id);
                                                $scope.status = 'Enregistrement supprimer avec succès';
                                                }, function() {
                                                    $scope.status = 'Opération annulée';                     
                                            });
                                 };$scope.regex = '^[a-zA-Z0-9._-]+$';
                                 
                                 $scope.validermention=function()
                                 {
                                		$http.post("/addMention",$scope.mention)
                                		.then(function(response){  		
                                			$scope.mention=response.data; 			
                                		    $scope.chargermention();
                                		    
                                		    
                                		    new PNotify({
                                                title: 'Umanager notification ',
                                                text:  'Opération éffectuée avec succes',
                                                type: 'success',
                                                styling: 'bootstrap3',
                                                delay:2000,
                                                history:false,
                                                sticker:true
                                                 
                                               });
                                		    
                                		 },function errorCallback(response){
                                			 new PNotify({
                                                 title: 'Umanager error ',
                                                 text: 'Cette mention  existe déjà',
                                                 type: 'error',
                                                 styling: 'bootstrap3',
                                                 delay:2500,
                                                 history:false,
                                                 sticker:true
                                                  
                                                });
                                			 
                                		 })
                               	    	
                                			
                               	    	
                                 }
                                 
                                 $scope.modifiermention=function(id1){
                                       $http.get("/updateMention?id="+id1)
                                            .then(function(response){
                                                    
                                                    $scope.mention=response.data;
                                                    
                                                });
                                 }    
                                  
                                 
                                $scope.supprimermention=function(id){
                                     $http.delete("/deleteMention?id="+id)
                                     	  .then(function(response){
                                             $scope.chargermention();
                                      });
              }


};
                   
/**
 * CONTROLLEUR POUR LA GESTION DES SIGNATAIRES
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
 * @returns tous les operation qui concerne les signataires
 */           

app.controller('paramsignataire', paramsignataire);

function paramsignataire($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                 			
$scope.signataire={};
$scope.listesignataire={};
$scope.users;
         

		 $http.get("/listeTitre")
			  .then(function(response){
				  $scope.listetitres=response.data;   	  
			});
	    
         $scope.chargersignataire=function()
         {
                $http.get("/listeSignataire")
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
                                             
                                 		      $scope.signataire.nom=null;
                                 		      $scope.signataire.prenom=null;
                                 		      $scope.user.data=null;
                                   });
                            };
                 		    
                 		    $scope.chargersignataire();
                 		    
                 		    $scope.user = {
                 		          data: []                            
                 		    }; 
                 		    
                 		    $scope.init=function(){
                 		          $scope.signataire={};
                 		    }
                                     
                             $scope.showConfirm = function(event,id) {
                                    var confirm = $mdDialog.confirm()
                                    .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                    .textContent('Cet operation ne pourra plus être annuler')
                                    .ariaLabel('UM Avertissement')
                                    .targetEvent(event)
                                    .ok('Oui')
                                    .cancel('Non');
                                         $mdDialog.show(confirm).then(function() {
                                             $scope.supprimersignataire(id);
                                             $scope.status = 'Enregistrement supprimer avec succès';
                                             }, function() {
                                                 $scope.status = 'Opération annulée';                     
                                         });
                              };$scope.regex = '^[a-zA-Z0-9._-]+$';
                              
                              $scope.validersignataire=function()
                              {
                             		$http.post("/addSignataire",$scope.signataire)
                             		.then(function(response){  		
                             					
                             		    $scope.chargersignataire();
                             		    
                                		   new PNotify({
                                               title: 'Umanager notification ',
                                               text:  'Opération éffectuée avec succes',
                                               type: 'success',
                                               styling: 'bootstrap3',
                                               delay:2000,
                                               history:false,
                                               sticker:true
                                                
                                              });
                               		    
                               		 },function errorCallback(response){
                               			 new PNotify({
                                                title: 'Umanager error ',
                                                text: 'Ce Signataire existe déjà',
                                                type: 'error',
                                                styling: 'bootstrap3',
                                                delay:2500,
                                                history:false,
                                                sticker:true
                                                 
                                               });
                               			 
                               		 })
                             			
                            	    	
                              }
                              
                              $scope.modifiersignataire=function(id1){
                                    $http.get("/updateSignataire?id="+id1)
                                         .then(function(response){
                                                 
                                                 $scope.signataire=response.data;
                                                 
                                             });
                              }    
                               
                              
                             $scope.supprimersignataire=function(id){
                                  $http.delete("/deleteSignataire?id="+id)
                                  	  .then(function(response){
                                          $scope.chargersignataire();
                                   });
           }


};           

/**
 * CONTROLLEUR POUR LA GESTION DES SITUATIONMAT
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
 * @returns tous les operation qui concerne les situationMat
 */           

app.controller('paramsituation', paramsituation);

function paramsituation($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                 			
$scope.situation={};
$scope.listesituation={};
$scope.users;
         

         $scope.chargersituation=function()
         {
                $http.get("/listeSituationMat")
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
                                 		      $scope.situation=null;
                                 		      $scope.user.data=null;
                                   });
                            };
                 		    
                 		    $scope.chargersituation();
                 		    
                 		    $scope.user = {
                 		          data: []                            
                 		    }; 
                 		    
                 		    $scope.init=function(){
                 		          $scope.situation={};
                 		    }
                                     
                             $scope.showConfirm = function(event,id) {
                                    var confirm = $mdDialog.confirm()
                                    .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                    .textContent('Cet operation ne pourra plus être annuler')
                                    .ariaLabel('UM Avertissement')
                                    .targetEvent(event)
                                    .ok('Oui')
                                    .cancel('Non');
                                         $mdDialog.show(confirm).then(function() {
                                             $scope.supprimersituation(id);
                                             $scope.status = 'Enregistrement supprimer avec succès';
                                             }, function() {
                                                 $scope.status = 'Opération annulée';                     
                                         });
                              };$scope.regex = '^[a-zA-Z0-9._-]+$';
                              
                              $scope.validersituation=function()
                              {
                             		$http.post("/addSituationMat",$scope.situation)
                             		.then(function(response){  		
                             			$scope.situation=response.data; 			
                             		    $scope.chargersituation();
                             		    
                             		});
                             			
                            	    	
                              }
                              
                              $scope.modifiersituation=function(id1){
                                    $http.get("/updateSituationMat?id="+id1)
                                         .then(function(response){
                                                 
                                                 $scope.situation=response.data;
                                                 
                                             });
                              }    
                               
                              
                             $scope.supprimersituation=function(id){
                                  $http.delete("/deleteSituationMat?id="+id)
                                  	  .then(function(response){
                                          $scope.chargersituation();
                                   });
           }


};           

/**
 * CONTROLLEUR POUR LA GESTION DES AUTORISATIONS
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
 * @returns tous les operation qui concerne les autorisations
 */           

app.controller('paramautorisation', paramautorisation);

function paramautorisation($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                 			
$scope.autorisation={};
$scope.listesignataire={};
$scope.users;
         

		 $http.get("/listeParcours")
			  .then(function(response){
				  $scope.listeparcours=response.data;   	  
			});
		 
		 $http.get("/listePeriode")
		  .then(function(response){
			  $scope.listeperiodes=response.data;   	  
		 });
		 
         $scope.chargerautorisation=function()
         {
                $http.get("/listeAutorisation")
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
                                 		      $scope.autorisation=null;
                                 		      $scope.user.data=null;
                                   });
                            };
                 		    
                 		    $scope.chargerautorisation();
                 		    
                 		    $scope.user = {
                 		          data: []                            
                 		    }; 
                 		    
                 		    $scope.init=function(){
                 		          $scope.autorisation={};
                 		    }
                                     
                             $scope.showConfirm = function(event,id) {
                                    var confirm = $mdDialog.confirm()
                                    .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                    .textContent('Cet operation ne pourra plus être annuler')
                                    .ariaLabel('UM Avertissement')
                                    .targetEvent(event)
                                    .ok('Oui')
                                    .cancel('Non');
                                         $mdDialog.show(confirm).then(function() {
                                             $scope.supprimerautorisation(id);
                                             $scope.status = 'Enregistrement supprimer avec succès';
                                             }, function() {
                                                 $scope.status = 'Opération annulée';                     
                                         });
                              };$scope.regex = '^[a-zA-Z0-9._-]+$';
                              
                              $scope.validerautorisation=function()
                              {
                             		$http.post("/addAutorisation",$scope.autorisation)
                             		.then(function(response){  	 			
                             		    $scope.chargerautorisation();
                             		    
                             		   new PNotify({
                                           title: 'Umanager notification ',
                                           text:  'Opération éffectuée avec succes',
                                           type: 'success',
                                           styling: 'bootstrap3',
                                           delay:2000,
                                           history:false,
                                           sticker:true
                                            
                                          });
                           		    
                           		 },function errorCallback(response){
                           			 new PNotify({
                                            title: 'Umanager error ',
                                            text: 'Cette autorisation existe déjà',
                                            type: 'error',
                                            styling: 'bootstrap3',
                                            delay:2500,
                                            history:false,
                                            sticker:true
                                             
                                           });
                           			 
                           		 })
                         			
                             			
                            	    	
                              }
                              
                              $scope.modifierautorisation=function(id1){
                                    $http.get("/updateAutorisation?id="+id1)
                                         .then(function(response){
                                                 
                                                 $scope.autorisation=response.data;
                                                 
                                             });
                              }    
                               
                              
                             $scope.supprimerautorisation=function(id){
                                  $http.delete("/deleteAutorisation?id="+id)
                                  	  .then(function(response){
                                          $scope.chargerautorisation();
                                   });
           }


};      

/**
 * CONTROLLEUR POUR LA GESTION DES OPT
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
 * @returns tous les operation qui concerne les opt
 */           

app.controller('paramoption', paramoption);

function paramoption($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                 			
$scope.option={};
$scope.listeoption={};
$scope.users;
     
         $scope.chargeroption=function()
         {
                $http.get("/listeOpt")
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
                                 		      $scope.option=null;
                                 		      $scope.user.data=null;
                                   });
                            };
                 		    
                 		    $scope.chargeroption();
                 		    
                 		    $scope.user = {
                 		          data: []                            
                 		    }; 
                 		    
                 		    $scope.init=function(){
                 		          $scope.option={};
                 		    }
                                     
                             $scope.showConfirm = function(event,id) {
                                    var confirm = $mdDialog.confirm()
                                    .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                    .textContent('Cet operation ne pourra plus être annuler')
                                    .ariaLabel('UM Avertissement')
                                    .targetEvent(event)
                                    .ok('Oui')
                                    .cancel('Non');
                                         $mdDialog.show(confirm).then(function() {
                                             $scope.supprimeroption(id);
                                             $scope.status = 'Enregistrement supprimer avec succès';
                                             }, function() {
                                                 $scope.status = 'Opération annulée';                     
                                         });
                              };$scope.regex = '^[a-zA-Z0-9._-]+$';
                              
                              $scope.valideroption=function()
                              {
                             		$http.post("/addOpt",$scope.option)
                             		.then(function(response){  		
                             			$scope.option=response.data; 			
                             		    $scope.chargeroption();
                             		    
                             		});
                             			
                            	    	
                              }
                              
                              $scope.modifieroption=function(id1){
                                    $http.get("/updateOpt?id="+id1)
                                         .then(function(response){
                                                 
                                                 $scope.option=response.data;
                                                 
                                             });
                              }    
                               
                              
                             $scope.supprimeroption=function(id){
                                  $http.delete("/deleteOpt?id="+id)
                                  	  .then(function(response){
                                          $scope.chargeroption();
                                   });
           }


};           
         

/**
 * CONTROLLEUR POUR LA GESTION DES PARCOURS
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
 * @returns tous les operation qui concerne les parcours
 */           

app.controller('paramparcours', paramparcours);

function paramparcours($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                 			
$scope.parcours={};
$scope.listeparcours={};
$scope.users;

		$http.get("/listeGrade")
		.then(function(response){
			  $scope.listegrades=response.data;   	  
		});
		
		$http.get("/listeEnseignant")
		.then(function(response){
		$scope.listeenseignants=response.data;   	  
		});
		
		$http.get("/listeSpecialite")
		.then(function(response){
		  $scope.listespecialites=response.data;   	  
			
		});
		
		$http.get("/listeDomaine")
		.then(function(response){
		  $scope.listedomaines=response.data;   	  
			
		});
		
		$http.get("/listeMention")
		.then(function(response){
		  $scope.listementions=response.data;   	  
			});
		
		$http.get("/listeOpt")
		.then(function(response){
		  $scope.listeoptions=response.data;   	  
			});
		
         $scope.chargerparcours=function()
         {
                $http.get("/listeParcours")
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
                                 		      $scope.parcours=null;
                                 		      $scope.user.data=null;
                                   });
                            };
                 		    
                 		    $scope.chargerparcours();
                 		    
                 		    $scope.user = {
                 		          data: []                            
                 		    }; 
                 		    
                 		    $scope.init=function(){
                 		          $scope.parcours={};
                 		    }
                                     
                             $scope.showConfirm = function(event,id) {
                                    var confirm = $mdDialog.confirm()
                                    .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                    .textContent('Cet operation ne pourra plus être annuler')
                                    .ariaLabel('UM Avertissement')
                                    .targetEvent(event)
                                    .ok('Oui')
                                    .cancel('Non');
                                         $mdDialog.show(confirm).then(function() {
                                             $scope.supprimerparcours(id);
                                             $scope.status = 'Enregistrement supprimer avec succès';
                                             }, function() {
                                                 $scope.status = 'Opération annulée';                     
                                         });
                              };$scope.regex = '^[a-zA-Z0-9._-]+$';
                              
                              $scope.validerparcours=function()
                              {
                             		$http.post("/addParcours",$scope.parcours)
                             		.then(function(response){  		
                             			$scope.parcours=response.data; 			
                             		    $scope.chargerparcours();
                             		    
                             		});
                             			
                            	    	
                              }
                              
                              $scope.modifierparcours=function(id1){
                                    $http.get("/updateParcours?id="+id1)
                                         .then(function(response){
                                                 
                                                 $scope.parcours=response.data;
                                                 
                                             });
                              }    
                               
                              
                             $scope.supprimerparcours=function(id){
                                  $http.delete("/deleteParcours?id="+id)
                                  	  .then(function(response){
                                          $scope.chargerparcours();
                                   });
           }


};           
         


/**
 * CONTROLLEUR POUR LA GESTION DES UE PROPOSES
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
 * @returns tous les operation qui concerne les UE Proposes
 */           

app.controller('parampropose', parampropose);

function parampropose($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                 			
$scope.propose={};
$scope.listepropose={};
$scope.users;

		$http.get("/listeParcours")
		.then(function(response){
			  $scope.listeparcours=response.data;   	  
		});
		
		$http.get("/listeEnseignant")
		.then(function(response){
		$scope.listeenseignants=response.data;   	  
		});
		
	
		$http.get("/listeUe")
			.then(function(response){
			  $scope.listeues=response.data;   	  
				
		});
	
		$scope.chargerUE=function(p,pr){
			$http.get("/listeUe2?id="+p+"&id1="+pr)
			.then(function(response){
			  $scope.listeuenonproposers=response.data;   	  
				});
		}
		
		$http.get("/listePeriode")
		.then(function(response){
		  $scope.listeperiodes=response.data;   	  
			
		});
		
		$http.get("/listeTypeUe")
		.then(function(response){
		  $scope.listetypeues=response.data;   	  
			
		});
		
		$scope.chargerUEPrerequis=function(){
			$http.get("/listeUePrerequis?id="+$scope.propose.parcours.idParcours+"&id1="+$scope.propose.periode.idPeriode)
			.then(function(response){
			  $scope.listeprerequis=response.data;   	  
				
			});
		}
	
         $scope.chargerpropose=function()
         {
                $http.get("/listeUeProposePeriode?id="+$scope.propose.parcours.idParcours+"&id1="+$scope.propose.periode.idPeriode)
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
			                                 
                                 			  $scope.propose.idUePropose=null;
			              	                  $scope.propose.nombreCreditUePropose=null;
			                    			  $scope.propose.enseignant.idProf=null;
			                    			  $scope.propose.typeUe.idTypeUe=null;
			                    			  $scope.propose.noteValidation=null;
			                    			  $scope.propose.montantCreditUePropose=null;
                                 		      $scope.user.data=null
                                   });
                            };
                 		    
                 		    
                 		    
                 		    $scope.user = {
                 		          data: []                            
                 		    }; 
                 		    
                 		    $scope.init=function(){
                 		          $scope.propose={};
                 		    }
                                     
                             $scope.showConfirm = function(event,id) {
                                    var confirm = $mdDialog.confirm()
                                    .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                    .textContent('Cet operation ne pourra plus être annuler')
                                    .ariaLabel('UM Avertissement')
                                    .targetEvent(event)
                                    .ok('Oui')
                                    .cancel('Non');
                                         $mdDialog.show(confirm).then(function() {
                                             $scope.supprimerpropose(id);
                                             $scope.status = 'Enregistrement supprimer avec succès';
                                             }, function() {
                                                 $scope.status = 'Opération annulée';                     
                                         });
                              };$scope.regex = '^[a-zA-Z0-9._-]+$';
                              
                              $scope.validerpropose=function()
                              {
                             		$http.post("/addUePropose",$scope.propose)
                             		.then(function(response){  	
                             			
                             			//$scope.propose=response.data;
                             			
                             		    $scope.chargerpropose();
                             		    $scope.chargerUEPrerequis();
                             		    $scope.chargerUE($scope.propose.parcours.idParcours,$scope.propose.periode.idPeriode);
                             		
                             		   new PNotify({
                                           title: 'Umanager notification ',
                                           text:  'Enregistrement éffectuée avec succes',
                                           type: 'success',
                                           styling: 'bootstrap3',
                                           delay:2000,
                                           history:false,
                                           sticker:true
                                            
                                          });
                           		    
                             		},function errorCallback(response){
                             			new PNotify({
                                            title: 'Umanager error ',
                                            text: 'Cet UE a déjà été propose pour cette période',
                                            type: 'error',
                                            styling: 'bootstrap3',
                                            delay:2500,
                                            history:false,
                                            sticker:true
                                             
                                           });
                           			 
                           		 })
                             			
                            	    	
                              }
                              
                              $scope.modifierpropose=function(id1){
                                    $http.get("/updateUePropose?id="+id1)
                                         .then(function(response){
                                                 
                                                 $scope.propose=response.data;
                                                 
                                             });
                              }    
                               
                              
                             $scope.supprimerpropose=function(id){
                                  $http.delete("/deleteUePropose?id="+id)
                                  	  .then(function(response){
                                          $scope.chargerpropose();
                                          $scope.chargerUEPrerequis();
                               		      $scope.chargerUE($scope.propose.parcours.idParcours,$scope.propose.periode.idPeriode);
                               	
                                   });
           }


}; 


/**
 * CONTROLLEUR POUR LA GESTION DES CHOIX DES UE 
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
 * @returns tous les operation qui concerne les  choix des UE
 */           

app.controller('paramchoisireue', paramchoisireue);

		   function paramchoisireue($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
			
		   $scope.choisireue={};
		   $scope.listechoisireue={};
		   $scope.users;
		   
		   $http.get("/listePeriode")
		      .then(function(response){
		              
		              $scope.listeperiodes=response.data;
		              
		   });
		   
		 
			 
		   $scope.chargerchoisireue=function()
		    {
		            $http.get("/listeUeaChoisir?id="+$scope.periodeliste)
		                 .then(function(response){
		                      $scope.users=response.data;
		                      if($scope.users.length>0){
                                  $scope.ok=1;
                              }
		                      $scope.usersTable = new NgTableParams({
		                                    page: 1,
		                                    count:10
		                                    }, {
		                                    total: $scope.users.length,
		                                    getData: function (params) {
		                                    $scope.data = params.sorting() ? $filter('orderBy')($scope.users, params.orderBy()) : $scope.users;
		                                    $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
		                                    $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
		                                    return $scope.data;
		                                    }
		                                    }); 
		                                $scope.choisireue=null;
		                                $scope.user.data=null;
		                                $scope.user1.data=null;
		                                
		                                $scope.afficheroption();
		                            });
		    };
		    
		  
		    
		    $scope.user = {
		          data: []                            
		    }; 
		    
		    
		    $scope.user1 = {
			          data: []                            
			    };
		    
		    $scope.init=function(){
		          $scope.choisireue={};
		    }
                    
            $scope.showConfirm = function(event,id) {
                   var confirm = $mdDialog.confirm()
                   .title('Etes-vous sur de vouloir supprimer cet choix d\' UE,')
                   .textContent('Cet operation ne pourra plus être annuler')
                   .ariaLabel('UM Avertissement')
                   .targetEvent(event)
                   .ok('Oui')
                   .cancel('Non');
                        $mdDialog.show(confirm).then(function() {
                            $scope.supprimerchoisireue(id);
                            $scope.status = 'Enregistrement supprimer avec succès';
                            }, function() {
                                $scope.status = 'Opération annulée';                     
                        });
             };$scope.regex = '^[a-zA-Z0-9._-]+$';
          
             
             $scope.modifierchoisireue=function(id1){
                   $http.get("/updateUeChoisie?id="+id1)
                        .then(function(response){
                                
                                $scope.choisireue=response.data;
                                
                            });
             }    
              
             $scope.voirmontant=function(){
                 $http.get("/montantchoisie")
                      .then(function(response){
                              
                              $scope.montant=response.data;
                              
                          });
             }    
            
             
             $scope.ajouterChoix=function(){
                 $http.get("/validerChoix")
                      .then(function(response){
                            $scope.chargerchoix();
                  });
             } 
             
             
             
            //////// frasparcours
             $scope.afficheroption=function(){
                 $http.get("/motifoptionnel")
                      .then(function(response){
                    	  $scope.listeoption=response.data;
                  });
             } 
             
             
            /////////  frais attribution 
             $scope.afficherAttriboption=function(){
                 $http.get("/motifpersoptionnel")
                      .then(function(response){
                    	  $scope.listeattriboption=response.data;
                  });
             } 
             
             
             
             $scope.showConfirm2 = function(event,id) {
                 var confirm = $mdDialog.confirm()
                 .title('Etes-vous sur de vouloir valider ces choix,')
                 .textContent('Cet operation est iréverssible')
                 .ariaLabel('UM Avertissement')
                 .targetEvent(event)
                 .ok('Oui')
                 .cancel('Non');
                      $mdDialog.show(confirm).then(function() {
                          $scope.ajouterChoix(id);
                          $scope.status = 'Enregistrement effectuer avec succès';
                          }, function() {
                              $scope.status = 'Opération annulée';                     
                      });
           };
           
           $scope.regex = '^[a-zA-Z0-9._-]+$';
        
             
            $scope.supprimerchoisireue=function(id){
                 $http.delete("/deleteUeChoisie?id="+id)
                 	  .then(function(response){
                        
                     	 $scope.chargerchoisireue();
          				 $scope.chargerchoix();
          				 $scope.voirmontant();
                  });
             }

            $scope.checkAll = function() {

				$scope.user.data = angular.copy($scope.users);
					
			};
	
		   $scope.uncheckAll = function() {

				 $scope.user.data= [];
				 
			};
			
			
			
			 $scope.validerchoisireue=function()
			 {
				 
				if ($scope.user.data!=null)
					{
				 
              	for (i=0;i<$scope.user.data.length;i++)
              	{
	    		          $http.get("/addUeChoisie?idUEpropose="+$scope.user.data[i].idUePropose)
	    			           .then(function(response)
	    			           {
	    			        	    $scope.chargerchoix();
	    			  				$scope.chargerchoisireue();
	    			  				$scope.voirmontant();
	    			           });
	    	    }
              	
       
   		         	 $scope.validerattributionperso();
   		         	 
					}else{
						
						$scope.validerattributionperso();
						
					}
				
			 
  				
      	     }
			 
			 /// ADDO  VALIDATION DES FRAIS PERSO
			 
             $scope.showConfirmattrib = function(event,id) {
                 var confirm = $mdDialog.confirm()
                 .title('Etes-vous sur de vouloir supprimer ces choix,')
                 .textContent('Cet operation est iréverssible')
                 .ariaLabel('UM Avertissement')
                 .targetEvent(event)
                 .ok('Oui')
                 .cancel('Non');
                      $mdDialog.show(confirm).then(function() {
                    	  $scope.supprimerperso(id);
                          $scope.status = 'Enregistrement effectuer avec succès';
                          }, function() {
                              $scope.status = 'Opération annulée';                     
                      });
           };
			 
			  
	            $scope.supprimerperso=function(id){
	                 $http.delete("/deleteAttribPerso?id="+id)
	                 	  .then(function(response){

   			        	   $scope.afficheroption() ;
   			        	   $scope.afficherAttriboption();
	                     	 
	                  });
	             }
			 
			 
			 
			 $scope.validerattributionperso=function()
			 {
              	for (i=0;i<$scope.user1.data.length;i++)
              	{
	    		          $http.get("/validermotfoptionnelle?totalScolarite="+$scope.user1.data[i].montant+"&frais="+$scope.user1.data[i].idFrais)
	    			           .then(function(response)
	    			           {
	    			        	 
	    			        	   $scope.afficheroption() ;
	    			        	   $scope.afficherAttriboption();
	    			        	   
	    			        	   
	    			        	   
	    			           });
              	}
              	
              	 
  				
      	     }
			 
			 
			$scope.chargerchoix=function(){
	    		  $http.get("/listeUeChoisie?id="+$scope.periodeliste)
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
	    				
	    				  $scope.afficheroption() ;
			        	   $scope.afficherAttriboption();
	         		});
	    		    
	         		
	         	};
	         
    };
          
    
    /**
     * CONTROLLEUR POUR LA GESTION DES CHOIX DES UE PAR LE DIRECTEUR
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
     * @returns tous les operation qui concerne les  choix des UE PAR LE DE
     */           

    app.controller('paramchoisireue2', paramchoisireue2);

    		   function paramchoisireue2($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
    			
    		   $scope.choisireue={};
    		   $scope.listechoisireue={};
    		   $scope.users;
    		   
    		   $http.get("/listePeriode")
    		      .then(function(response){
    		              
    		              $scope.listeperiodes=response.data;
    		              
    		   });
    		   
    		   $http.get("/listeParcours")
    		      .then(function(response){
    		              
    		              $scope.listeparcours=response.data;
    		              
    		   });
    		   
    		   $scope.chargeretudiant=function(){	
    				$http.get("/listeInscrir?id="+$scope.parcoursliste)
    						.then(function(response){
    							$scope.listeinscriptions=response.data;
    			 			 	$scope.erreury=null;			
    							
    			  	});
    			};
    			 
    		   $scope.chargerchoisireue=function()
    		    {
    		            $http.get("/listeUeaChoisir2?id="+$scope.periodeliste+"&id1="+$scope.etudiantes)
    		                 .then(function(response){
    		                      $scope.users=response.data;
    		                      if($scope.users.length>0){
                                      $scope.ok=1;
                                  }
    		                      $scope.usersTable = new NgTableParams({
    		                                    page: 1,
    		                                    count:10
    		                                    }, {
    		                                    total: $scope.users.length,
    		                                    getData: function (params) {
    		                                    $scope.data = params.sorting() ? $filter('orderBy')($scope.users, params.orderBy()) : $scope.users;
    		                                    $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
    		                                    $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
    		                                    return $scope.data;
    		                                    }
    		                                    }); 
    		                                $scope.choisireue=null;
    		                                $scope.user.data=null;
    		                                $scope.user1.data=null;
    		                                
    		                                $scope.afficheroption();
    		                            });
    		    };
    		    
    		  
    		    
    		    $scope.user = {
    		          data: []                            
    		    }; 
    		    
    		    
    		    $scope.user1 = {
    			          data: []                            
    			    };
    		    
    		    $scope.init=function(){
    		          $scope.choisireue={};
    		    }
                        
                $scope.showConfirm = function(event,id) {
                       var confirm = $mdDialog.confirm()
                       .title('Etes-vous sur de vouloir supprimer cet choix d\' UE,')
                       .textContent('Cet operation ne pourra plus être annuler')
                       .ariaLabel('UM Avertissement')
                       .targetEvent(event)
                       .ok('Oui')
                       .cancel('Non');
                            $mdDialog.show(confirm).then(function() {
                                $scope.supprimerchoisireueDE(id);
                                $scope.status = 'Enregistrement supprimer avec succès';
                                }, function() {
                                    $scope.status = 'Opération annulée';                     
                            });
                 };$scope.regex = '^[a-zA-Z0-9._-]+$';
                
                  //voir le montant des UE choisie
                 $scope.voirmontant=function(){
                     $http.get("/montantchoisie2?ide="+$scope.etudiantes)
                          .then(function(response){
                                  
                                  $scope.montant=response.data;
                                  
                              });
                 }    
                
                 //Valider son choix d\'UE
                 $scope.ajouterChoix=function(){
                     $http.get("/validerChoixDE")
                          .then(function(response){
                                $scope.chargerchoix();
                      });
                 } 
                 
                 
                //////// frasparcours
                 $scope.afficheroption=function(){
                     $http.get("/motifoptionnel2?id="+$scope.etudiantes)
                          .then(function(response){
                        	  $scope.listeoption=response.data;
                      });
                 } 
                 
                 
                /////////  frais attribution 
                 $scope.afficherAttriboption=function(){
                     $http.get("/motifpersoptionnel2?id="+$scope.etudiantes)
                          .then(function(response){
                        	  $scope.listeattriboption=response.data;
                      });
                 } 
                 
                 
                 
                 $scope.showConfirm2 = function(event,id) {
                     var confirm = $mdDialog.confirm()
                     .title('Etes-vous sur de vouloir valider ces choix,')
                     .textContent('Cet operation est iréverssible')
                     .ariaLabel('UM Avertissement')
                     .targetEvent(event)
                     .ok('Oui')
                     .cancel('Non');
                          $mdDialog.show(confirm).then(function() {
                              $scope.ajouterChoix(id);
                              $scope.status = 'Enregistrement effectuer avec succès';
                              }, function() {
                                  $scope.status = 'Opération annulée';                     
                          });
               };
               
               $scope.regex = '^[a-zA-Z0-9._-]+$';
            
                 
                $scope.supprimerchoisireueDE=function(id){
                     $http.delete("/deleteUeChoisie2?id="+id)
                     	  .then(function(response){
                            
                         	 $scope.chargerchoisireue();
              				 $scope.chargerchoix();
              				 $scope.voirmontant();
                      });
                 }

                $scope.checkAll = function() {

    				$scope.user.data = angular.copy($scope.users);
    					
    			};
    	
    		   $scope.uncheckAll = function() {

    				 $scope.user.data= [];
    				 
    			};
    			
    			
    			
    			 $scope.validerchoisireue=function()
    			 {
    				 
    				if ($scope.user.data!=null)
    					{
    				 
                  	for (i=0;i<$scope.user.data.length;i++)
                  	{
    	    		          $http.get("/addUeChoisieDE?idUEpropose="+$scope.user.data[i].idUePropose+"&id2="+$scope.etudiantes)
    	    			           .then(function(response)
    	    			           {
    	    			        	    $scope.chargerchoix();
    	    			  				$scope.chargerchoisireue();
    	    			  				$scope.voirmontant();
    	    			           });
    	    	    }
                  	
           
       		         	 $scope.validerattributionperso();
       		         	 
    					}else{
    						
    						$scope.validerattributionperso();
    						
    					}
    				
    			 
      				
          	     }
    			 
    			 ///   VALIDATION DES FRAIS PERSO
    			 
                 $scope.showConfirmattrib = function(event,id) {
                     var confirm = $mdDialog.confirm()
                     .title('Etes-vous sur de vouloir supprimer ces choix,')
                     .textContent('Cet operation est iréverssible')
                     .ariaLabel('UM Avertissement')
                     .targetEvent(event)
                     .ok('Oui')
                     .cancel('Non');
                          $mdDialog.show(confirm).then(function() {
                        	  $scope.supprimerperso(id);
                              $scope.status = 'Enregistrement effectuer avec succès';
                              }, function() {
                                  $scope.status = 'Opération annulée';                     
                          });
               };
    			 
    			  
    	            $scope.supprimerperso=function(id){
    	                 $http.delete("/deleteAttribPerso?id="+id)
    	                 	  .then(function(response){

       			        	   $scope.afficheroption() ;
       			        	   $scope.afficherAttriboption();
    	                     	 
    	                  });
    	             }
    			 
    			 
    			 
    			 $scope.validerattributionperso=function()
    			 {
                  	for (i=0;i<$scope.user1.data.length;i++)
                  	{
    	    		          $http.get("/validermotfoptionnelleDE?totalScolarite="+$scope.user1.data[i].montant+"&frais="+$scope.user1.data[i].idFrais+"&id="+$scope.etudiantes)
    	    			           .then(function(response)
    	    			           {
    	    			        	 
    	    			        	   $scope.afficheroption() ;
    	    			        	   $scope.afficherAttriboption();
    	    			        	   
    	    			        	   
    	    			        	   
    	    			           });
                  	}
                  	
                  	 
      				
          	     }
    			 
    			 
    			$scope.chargerchoix=function(){
    	    		  $http.get("/listeUeChoisie2?id="+$scope.periodeliste+"&id2="+$scope.etudiantes)
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
    	    				
    	    				  $scope.afficheroption() ;
    			        	   $scope.afficherAttriboption();
    	         		});
    	    		    
    	         		
    	         	};
    	         
        };
/**
 * CONTROLLEUR POUR LA GESTION DES TYPE UE
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
 * @returns tous les operation qui concerne les paramtypes
 */           

app.controller('paramtype', paramtype);

function paramtype($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                 			
$scope.type={};
$scope.listetype={};
$scope.users;
     
         $scope.chargertype=function()
         {
                $http.get("/listeTypeUe")
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
                                 		      $scope.type=null;
                                 		      $scope.user.data=null;
                                   });
                            };
                 		    
                 		    $scope.chargertype();
                 		    
                 		    $scope.user = {
                 		          data: []                            
                 		    }; 
                 		    
                 		    $scope.init=function(){
                 		          $scope.type={};
                 		    }
                                     
                             $scope.showConfirm = function(event,id) {
                                    var confirm = $mdDialog.confirm()
                                    .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                    .textContent('Cet operation ne pourra plus être annuler')
                                    .ariaLabel('UM Avertissement')
                                    .targetEvent(event)
                                    .ok('Oui')
                                    .cancel('Non');
                                         $mdDialog.show(confirm).then(function() {
                                             $scope.supprimertype(id);
                                             $scope.status = 'Enregistrement supprimer avec succès';
                                             }, function() {
                                                 $scope.status = 'Opération annulée';                     
                                         });
                              };$scope.regex = '^[a-zA-Z0-9._-]+$';
                              
                              $scope.validertype=function()
                              {
                             		$http.post("/addTypeUe",$scope.type)
                             		.then(function(response){  		
                             			$scope.type=response.data; 			
                             		    $scope.chargertype();
                             		    
                             		   new PNotify({
                                           title: 'Umanager notification ',
                                           text:  'Enregistrement éffectuée avec succes',
                                           type: 'success',
                                           styling: 'bootstrap3',
                                           delay:2000,
                                           history:false,
                                           sticker:true
                                            
                                          });
                           		    
                             		},function errorCallback(response){
                             			new PNotify({
                                            title: 'Umanager error ',
                                            text: 'Ce type UE existe déjà',
                                            type: 'error',
                                            styling: 'bootstrap3',
                                            delay:2500,
                                            history:false,
                                            sticker:true
                                             
                                           });
                           			 
                           		 })
                             			
                             			
                            	    	
                              }
                              
                              $scope.modifiertype=function(id1){
                                    $http.get("/updateTypeUe?id="+id1)
                                         .then(function(response){
                                                 
                                                 $scope.type=response.data;
                                                 
                                             });
                              }    
                               
                              
                             $scope.supprimertype=function(id){
                                  $http.delete("/deleteTypeUe?id="+id)
                                  	  .then(function(response){
                                          $scope.chargertype();
                                   });
                      }


              };           
        



              /**
               * CONTROLLEUR POUR LA GESTION DES UE
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
               * @returns tous les operations qui concerne les UE
               */           

              app.controller('paramunite', paramunite);

              function paramunite($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                               			
              $scope.unite={};
              $scope.listeunite={};
              $scope.users;
                   
                       $scope.chargerunite=function()
                       {
                              $http.get("/listeUe")
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
                                               		      $scope.unite=null;
                                               		      $scope.user.data=null;
                                                 });
                                          };
                               		    
                               		    $scope.chargerunite();
                               		    
                               		    $scope.user = {
                               		          data: []                            
                               		    }; 
                               		    
                               		    $scope.init=function(){
                               		          $scope.unite={};
                               		    }
                                                   
                                           $scope.showConfirm = function(event,id) {
                                                  var confirm = $mdDialog.confirm()
                                                  .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                                  .textContent('Cet operation ne pourra plus être annuler')
                                                  .ariaLabel('UM Avertissement')
                                                  .targetEvent(event)
                                                  .ok('Oui')
                                                  .cancel('Non');
                                                       $mdDialog.show(confirm).then(function() {
                                                           $scope.supprimerunite(id);
                                                           $scope.status = 'Enregistrement supprimer avec succès';
                                                           }, function() {
                                                               $scope.status = 'Opération annulée';                     
                                                       });
                                            };$scope.regex = '^[a-zA-Z0-9._-]+$';
                                            
                                            $scope.validerunite=function()
                                            {
                                           		$http.post("/addUe",$scope.unite)
                                           		.then(function(response){  		
                                           			$scope.unite=response.data; 			
                                           		    $scope.chargerunite();
                                           		     
                                           		   new PNotify({
                                                       title: 'Umanager notification ',
                                                       text:  'Enregistrement éffectuée avec succes',
                                                       type: 'success',
                                                       styling: 'bootstrap3',
                                                       delay:2000,
                                                       history:false,
                                                       sticker:true
                                                        
                                                      });
                                       		    
                                         		},function errorCallback(response){
                                         			new PNotify({
                                                        title: 'Umanager error ',
                                                        text: 'Cette Unité d\'eseignement existe déjà',
                                                        type: 'error',
                                                        styling: 'bootstrap3',
                                                        delay:2500,
                                                        history:false,
                                                        sticker:true
                                                         
                                                       });
                                       			 
                                       		 })
                                         			
                                           			
                                          	    	
                                            }
                                            
                                            $scope.modifierunite=function(id1){
                                                  $http.get("/updateUe?id="+id1)
                                                       .then(function(response){
                                                               
                                                               $scope.unite=response.data;
                                                               
                                                           });
                                            }    
                                             
                                            
                                           $scope.supprimerunite=function(id){
                                                $http.delete("/deleteUe?id="+id)
                                                	  .then(function(response){
                                                        $scope.chargerunite();
                                                 });
                                    }


                            };           
  
                            

/** * CONTROLLEUR POUR LA GESTION DES MOTIFS RECOUVREMENTS*/           

app.controller('parammotif', parammotif);

            function parammotif($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                                             			
                            $scope.motif={};
                            $scope.listemotif={};
                            $scope.users;
                        
              	    
                                     $scope.chargermotif=function()
                                     {
                                            $http.get("/listeMotifRecouvrement")
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
                                                             		      $scope.motif=null;
                                                             		      $scope.user.data=null;
                                                               });
                                                        };
                                             		    
                                             		    $scope.chargermotif();
                                             		    
                                             		    $scope.user = {
                                             		          data: []                            
                                             		    }; 
                                             		    
                                             		    $scope.init=function(){
                                             		          $scope.motif={};
                                             		    }
                                                                 
                                                         $scope.showConfirm = function(event,id) {
                                                                var confirm = $mdDialog.confirm()
                                                                .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                                                .textContent('Cet operation ne pourra plus être annuler')
                                                                .ariaLabel('UM Avertissement')
                                                                .targetEvent(event)
                                                                .ok('Oui')
                                                                .cancel('Non');
                                                                     $mdDialog.show(confirm).then(function() {
                                                                         $scope.supprimermotif(id);
                                                                         $scope.status = 'Enregistrement supprimer avec succès';
                                                                         }, function() {
                                                                             $scope.status = 'Opération annulée';                     
                                                                     });
                                                          };$scope.regex = '^[a-zA-Z0-9._-]+$';
                                                          
                                                          $scope.validermotif=function()
                                                          {
                                                         		$http.post("/addMotifRecouvrement",$scope.motif)
                                                         		.then(function(response){  		
                                                         			$scope.motif=response.data; 			
                                                         		    $scope.chargermotif();
                                                         		    
                                                         		   new PNotify({
                                                                       title: 'Umanager notification ',
                                                                       text:  'Enrégistrement éffectuée avec succes',
                                                                       type: 'success',
                                                                       styling: 'bootstrap3',
                                                                       delay:2000,
                                                                       history:false,
                                                                       sticker:true
                                                                        
                                                                      });
                                                       		    
                                                       		 },function errorCallback(response){
                                                       			 new PNotify({
                                                                        title: 'Umanager error ',
                                                                        text: 'Ce motif des recouvrements existe déjà',
                                                                        type: 'error',
                                                                        styling: 'bootstrap3',
                                                                        delay:2500,
                                                                        history:false,
                                                                        sticker:true
                                                                         
                                                                       });
                                                       			 
                                                       		 })
                                                         			
                                                        	    	
                                                          }
                                                          
                                                          $scope.modifiermotif=function(id1){
                                                                $http.get("/updateMotifRecouvrement?id="+id1)
                                                                     .then(function(response){
                                                                             
                                                                             $scope.motif=response.data;
                                                                             
                                                                         });
                                                          }    
                                                           
                                                          
                                                         $scope.supprimermotif=function(id){
                                                              $http.delete("/deleteMotifRecouvrement?id="+id)
                                                              	  .then(function(response){
                                                                      $scope.chargermotif();
                                                               });
                                                  }


                                          };           
  

                                         
                            /**
                             * CONTROLLEUR POUR LA GESTION DES FRAIS RECOUVREMENTS
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
                             * @returns tous les operation qui concerne les frais
                             */           

         app.controller('paramfrais', paramfrais);

                            function paramfrais($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                                             			
                            $scope.frais={};
                            $scope.listefrais={};
                            $scope.users;
                                 
                            $http.get("/listeParcours")
	              			  .then(function(response){
	              				  $scope.listeparcours=response.data;   	  
	              			});
                            
                            $http.get("/listeMotifRecouvrement")
	              			  .then(function(response){
	              				  $scope.listemotifs=response.data;   	  
	              			});
              	    
                                     $scope.chargerfrais=function(id)
                                     {
                                            $http.get("/listeFraisParcours?idp="+id)
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
                                                             
                                                             		      $scope.frais.idFrais=null;
                                                             		      $scope.frais.motif.idMotifRecouvrement=null;
                                                             		     $scope.frais.special=null;
                                                             		      $scope.frais.montant=null;
                                                             		      $scope.user.data=null
                                                               });
                                   };
                                             		    
                                             		 
                                             		    
                                             		    $scope.user = {
                                             		          data: []                            
                                             		    }; 
                                             		    
                                             		    $scope.init=function(){
                                             		          $scope.frais={};
                                             		    }
                                                                 
                                                         $scope.showConfirm = function(event,id) {
                                                                var confirm = $mdDialog.confirm()
                                                                .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                                                .textContent('Cet operation ne pourra plus être annuler')
                                                                .ariaLabel('UM Avertissement')
                                                                .targetEvent(event)
                                                                .ok('Oui')
                                                                .cancel('Non');
                                                                     $mdDialog.show(confirm).then(function() {
                                                                         $scope.supprimerfrais(id);
                                                                         $scope.status = 'Enregistrement supprimer avec succès';
                                                                         }, function() {
                                                                             $scope.status = 'Opération annulée';                     
                                                                     });
                                                          };$scope.regex = '^[a-zA-Z0-9._-]+$';
                                                          
                                                          $scope.validerfrais=function()
                                                          {
                                                         		$http.post("/addFraisParcours",$scope.frais)
                                                         		.then(function(response){  		
                                                         			$scope.frais=response.data; 			
                                                         		    $scope.chargerfrais($scope.frais.parcours.idParcours);
                                                         		    
                                                         		   new PNotify({
                                                                       title: 'Umanager notification ',
                                                                       text:  'Enrégistrement éffectuée avec succes',
                                                                       type: 'success',
                                                                       styling: 'bootstrap3',
                                                                       delay:2000,
                                                                       history:false,
                                                                       sticker:true
                                                                        
                                                                      });
                                                       		    
                                                       		 },function errorCallback(response){
                                                       			 new PNotify({
                                                                        title: 'Umanager error ',
                                                                        text: 'Ce Frais parcours à déjà attribué',
                                                                        type: 'error',
                                                                        styling: 'bootstrap3',
                                                                        delay:2500,
                                                                        history:false,
                                                                        sticker:true
                                                                         
                                                                       });
                                                       			 
                                                       		 })
                                                         			
                                                         			
                                                        	    	
                                                          }
                                                          
                                                          $scope.modifierfrais=function(id1){
                                                                $http.get("/updateFraisParcours?id="+id1)
                                                                     .then(function(response){
                                                                             
                                                                             $scope.frais=response.data;
                                                                             
                                                                         });
                                                          }    
                                                           
                                                          
                                                         $scope.supprimerfrais=function(id){
                                                              $http.delete("/deleteFraisParcours?id="+id)
                                                              	  .then(function(response){
                                                                      $scope.chargerfrais();
                                                               });
                                                  }


                                          };           
                                    
                                         

/**
     Tous les operations qui concerne les nationalites
*/           

 app.controller('paramnationalite', paramnationalite);

         function paramnationalite($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                                             			
                            $scope.nationalite={};
                            $scope.listenationalite={};
                            $scope.users;
                                 
                                     $scope.chargernationalite=function()
                                     {
                                            $http.get("/listeNationalite")
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
                                                             		      $scope.nationalite=null;
                                                             		      $scope.user.data=null;
                                                               });
                                                        };
                                             		    
                                             		    $scope.chargernationalite();
                                             		    
                                             		    $scope.user = {
                                             		          data: []                            
                                             		    }; 
                                             		    
                                             		    $scope.init=function(){
                                             		          $scope.nationalite={};
                                             		    }
                                                                 
                                                         $scope.showConfirm = function(event,id) {
                                                                var confirm = $mdDialog.confirm()
                                                                .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                                                .textContent('Cet operation ne pourra plus être annuler')
                                                                .ariaLabel('UM Avertissement')
                                                                .targetEvent(event)
                                                                .ok('Oui')
                                                                .cancel('Non');
                                                                     $mdDialog.show(confirm).then(function() {
                                                                         $scope.supprimernationalite(id);
                                                                         $scope.status = 'Enregistrement supprimer avec succès';
                                                                         }, function() {
                                                                             $scope.status = 'Opération annulée';                     
                                                                     });
                                                          };$scope.regex = '^[a-zA-Z0-9._-]+$';
                                                          
                                                          $scope.validernationalite=function()
                                                          {
                                                         		$http.post("/addNationnalite",$scope.nationalite)
                                                         		.then(function(response){  		
                                                         			$scope.nationalite=response.data; 			
                                                         		    $scope.chargernationalite();
                                                         		    
                                                         		   new PNotify({
                                                                       title: 'Umanager notification ',
                                                                       text:  'Opération éffectuée avec succes',
                                                                       type: 'success',
                                                                       styling: 'bootstrap3',
                                                                       delay:2000,
                                                                       history:false,
                                                                       sticker:true
                                                                        
                                                                      });
                                                       		    
                                                       		 },function errorCallback(response){
                                                       			 new PNotify({
                                                                        title: 'Umanager error ',
                                                                        text: 'Cette mationalité  existe déjà',
                                                                        type: 'error',
                                                                        styling: 'bootstrap3',
                                                                        delay:2500,
                                                                        history:false,
                                                                        sticker:true
                                                                         
                                                                       });
                                                       			 
                                                       		 })
                                                      	    	
                                                        	    	
                                                          }
                                                          
                                                          $scope.modifiernationalite=function(id1){
                                                                $http.get("/updateNationalite?id="+id1)
                                                                     .then(function(response){
                                                                             
                                                                             $scope.nationalite=response.data;
                                                                             
                                                                         });
                                                          }    
                                                           
                                                          
                                                         $scope.supprimernationalite=function(id){
                                                              $http.delete("/deleteNationalite?id="+id)
                                                              	  .then(function(response){
                                                                      $scope.chargernationalite();
                                                               });
                                                  }


                                          };           
                                    

                                          /**
                                           * CONTROLLEUR POUR LA GESTION DES STATUS
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
                                           * @returns tous les operations qui concerne les STATUS
                                           */           

               app.controller('paramstatut', paramstatut);

                       function paramstatut($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                                                           			
                                          $scope.statut={};
                                          $scope.listestatut={};
                                          $scope.users;
                                               
                                                   $scope.chargerstatut=function()
                                                   {
                                                          $http.get("/listeStatut")
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
                                                                           		      $scope.statut=null;
                                                                           		      $scope.user.data=null;
                                                                             });
                                                                      };
                                                           		    
                                                           		    $scope.chargerstatut();
                                                           		    
                                                           		    $scope.user = {
                                                           		          data: []                            
                                                           		    }; 
                                                           		    
                                                           		    $scope.init=function(){
                                                           		          $scope.statut={};
                                                           		    }
                                                                               
                                                                       $scope.showConfirm = function(event,id) {
                                                                              var confirm = $mdDialog.confirm()
                                                                              .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                                                              .textContent('Cet operation ne pourra plus être annuler')
                                                                              .ariaLabel('UM Avertissement')
                                                                              .targetEvent(event)
                                                                              .ok('Oui')
                                                                              .cancel('Non');
                                                                                   $mdDialog.show(confirm).then(function() {
                                                                                       $scope.supprimerstatut(id);
                                                                                       $scope.status = 'Enregistrement supprimer avec succès';
                                                                                       }, function() {
                                                                                           $scope.status = 'Opération annulée';                     
                                                                                   });
                                                                        };$scope.regex = '^[a-zA-Z0-9._-]+$';
                                                                        
                                                                        $scope.validerstatut=function()
                                                                        {
                                                                       		$http.post("/addStatut",$scope.statut)
                                                                       		.then(function(response){  		
                                                                       			$scope.statut=response.data; 			
                                                                       		    $scope.chargerstatut();
                                                                       		
                                                                       		new PNotify({
                                                                                 title: 'Umanager notification ',
                                                                                 text:  'Opération éffectuée avec succes',
                                                                                 type: 'success',
                                                                                 styling: 'bootstrap3',
                                                                                 delay:2000,
                                                                                 history:false,
                                                                                 sticker:true
                                                                                  
                                                                                });
                                                                 		    
                                                                 		 },function errorCallback(response){
                                                                 			 new PNotify({
                                                                                  title: 'Umanager error ',
                                                                                  text: 'Cet statut existe déjà',
                                                                                  type: 'error',
                                                                                  styling: 'bootstrap3',
                                                                                  delay:2500,
                                                                                  history:false,
                                                                                  sticker:true
                                                                                   
                                                                                 });
                                                                 			 
                                                                 		 })
                                                                       			
                                                                      	    	
                                                                        }
                                                                        
                                                                        $scope.modifierstatut=function(id1){
                                                                              $http.get("/updateStatut?id="+id1)
                                                                                   .then(function(response){
                                                                                           
                                                                                           $scope.statut=response.data;
                                                                                           
                                                                                       });
                                                                        }    
                                                                         
                                                                        
                                                                       $scope.supprimernationalite=function(id){
                                                                            $http.delete("/deleteStatut?id="+id)
                                                                            	  .then(function(response){
                                                                                    $scope.chargerstatut();
                                                                             });
                                                                }


                                                        };           
                                            


         
         


/**
 * CONTROLLEUR POUR LA GESTION DES ENSEIGNANTS
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
 * @returns
 */
                                                        
app.controller('paramenseignant', paramenseignant);

             function paramenseignant($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                                                                         			
                                                        $scope.enseignant={};
                                                        $scope.listeenseignant={};
                                                        $scope.users;
                                                                 

                                                        		 $http.get("/listeGrade")
                                                        			  .then(function(response){
                                                        				  $scope.listegrades=response.data;   	  
                                                        			});
                                                        		 
                                                        		 $http.get("/listeNationalite")
                                                   			  .then(function(response){
                                                   				  $scope.listenationalites=response.data;   	  
                                                   		     	});
                                                        		
                                                        		 $http.get("/listeStatut")
                                                      			  .then(function(response){
                                                      				  $scope.listestatuts=response.data;   	  
                                                      		     	});
                                                        		 
                                                        		 $http.get("/listeTitre")
                                                      			  .then(function(response){
                                                      				  $scope.listetitres=response.data;   	  
                                                      		     	});
                                                        		 
                                                                 $scope.chargerenseignant=function()
                                                                 {
                                                                        $http.get("/listeEnseignant")
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
                                                                                         		      $scope.enseignant=null;
                                                                                         		      
                                                                                         		      $scope.user.data=null
                                                                                           });
                                                                                    };
                                                                         		    
                                                                         		    $scope.chargerenseignant();
                                                                         		    
                                                                         		    $scope.user = {
                                                                         		          data: []                            
                                                                         		    }; 
                                                                         		    
                                                                         		    $scope.init=function(){
                                                                         		          $scope.enseignant={};
                                                                         		    }
                                                                                             
                                                                                     $scope.showConfirm = function(event,id) {
                                                                                            var confirm = $mdDialog.confirm()
                                                                                            .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                                                                            .textContent('Cet operation ne pourra plus être annuler')
                                                                                            .ariaLabel('UM Avertissement')
                                                                                            .targetEvent(event)
                                                                                            .ok('Oui')
                                                                                            .cancel('Non');
                                                                                                 $mdDialog.show(confirm).then(function() {
                                                                                                     $scope.supprimerenseignant(id);
                                                                                                     $scope.status = 'Enregistrement supprimer avec succès';
                                                                                                     }, function() {
                                                                                                         $scope.status = 'Opération annulée';                     
                                                                                                 });
                                                                                      };$scope.regex = '^[a-zA-Z0-9._-]+$';
                                                                                      
                                                                                      $scope.validerenseignant=function()
                                                                                      {
                                                                                     		$http.post("/addEnseignant",$scope.enseignant)
                                                                                     		.then(function(response){  		
                                                                                     			$scope.enseignant=response.data; 			
                                                                                     		    $scope.chargerenseignant();
                                                                                     		    
                                                                                     		   new PNotify({
                                                                                                   title: 'Umanager notification ',
                                                                                                   text:  'Enregistrement éffectuée avec succes',
                                                                                                   type: 'success',
                                                                                                   styling: 'bootstrap3',
                                                                                                   delay:2000,
                                                                                                   history:false,
                                                                                                   sticker:true
                                                                                                    
                                                                                                  });
                                                                                   		    
                                                                                     		},function errorCallback(response){
                                                                                     			new PNotify({
                                                                                                    title: 'Umanager error ',
                                                                                                    text: 'Cet enseignant existe déjà',
                                                                                                    type: 'error',
                                                                                                    styling: 'bootstrap3',
                                                                                                    delay:2500,
                                                                                                    history:false,
                                                                                                    sticker:true
                                                                                                     
                                                                                                   });
                                                                                   			 
                                                                                   		 })
                                                                                     			
                                                                                    	    	
                                                                                      }
                                                                                      
                                                                                      $scope.modifierenseignant=function(id1){
                                                                                            $http.get("/updateEnseignant?id="+id1)
                                                                                                 .then(function(response){
                                                                                                	  
                                                                                                	   $scope.enseignant=response.data;
                                                                                                	   $scope.enseignant.dateNaissance= new Date($scope.enseignant.dateNaissance) 
                                                                                                	   $scope.enseignant.dateRecrutement= new Date($scope.enseignant.dateRecrutement) 
                                                                                                       
                                                                                                     });
                                                                                      }
                                                                                      
                                                                                      $scope.modifierenseignant2=function(id1){
                                                                                          $http.get("/updateEnseignant?id="+id1)
                                                                                               .then(function(response){
                                                                                            	  
                                                                                              	   $scope.professeur=response.data;  
                                                                                                   });
                                                                                    }    
                                                                                     
                                                                                      
                                                                                     $scope.supprimerenseignant=function(id){
                                                                                          $http.delete("/deleteEnseignant?id="+id)
                                                                                          	  .then(function(response){
                                                                                                  $scope.chargerenseignant();
                                                                                           });
                                                                   }
                                                                                     
                                                                                     $scope.activerenseignant=function(id){
                                                                                         $http.get("/activerEnseignant?id="+id)
                                                                                         	  .then(function(response){
                                                                                                 $scope.chargerenseignant();
                                                                                                 new PNotify({
                                                                                                     title: 'Umanager notification ',
                                                                                                     text:  'Enseignant activé avec succes',
                                                                                                     type: 'success',
                                                                                                     styling: 'bootstrap3',
                                                                                                     delay:2000,
                                                                                                     history:false,
                                                                                                     sticker:true
                                                                                                      
                                                                                                    });
                                                                                          });
                                                                  }
                                                                                     $scope.desactiverenseignant=function(id){
                                                                                         $http.get("/desactiverEnseignant?id="+id)
                                                                                         	  .then(function(response){
                                                                                                 $scope.chargerenseignant();
                                                                                                 new PNotify({
                                                                                                     title: 'Umanager notification ',
                                                                                                     text:  'Enseignant desactivé avec succes',
                                                                                                     type: 'warning',
                                                                                                     styling: 'bootstrap3',
                                                                                                     delay:2000,
                                                                                                     history:false,
                                                                                                     sticker:true
                                                                                                      
                                                                                                    });
                                                                                          });
                                                                  }
                                                                                     $scope.transfererx=function(){
                                                                                         $("#myModal").modal({backdrop:"static"});
                                                                                                 $("#myModal").modal({keyboard: true});
                                                                                                
                                                                                     };
                                                                                     $scope.fermer=function(){
                                                                                          $("#myModal").modal('hide');
                                                                                      };   

                                                        };      

         



                                                        /**
                                                         * CONTROLLEUR POUR LA GESTION DES GRADES
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
                                                         * @returns
                                                         */
                                                                                                                
							app.controller('paramgrade', paramgrade);
							
							                          function paramgrade($scope, $window,$mdSelect,$mdDialog, $http,$rootScope, $element,$filter,$routeParams, NgTableParams,$location) {     
                                                                                                                                 			
                                                                                                                $scope.grade={};
                                                                                                                $scope.listegrade={};
                                                                                                                $scope.users;
                                                                                                                         

                                                                                                                		 $http.get("/listeStatut")
                                                                                                                			  .then(function(response){
                                                                                                                				  $scope.listestatus=response.data;   	  
                                                                                                                			});
                                                                                                                	    
                                                                                                                         $scope.chargergrade=function()
                                                                                                                         {
                                                                                                                                $http.get("/listeGrade")
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
                                                                                                                                                 		      $scope.grade.idGrade=null;
                                                                                                                                                 		      $scope.grade.libelleGrade=null;
                                                                                                                                                 		      $scope.grade.tauxHoraire=null;
                                                                                                                                                 		      $scope.grade.statut.id=null;
                                                                                                                                                 		      
                                                                                                                                                 		      
                                                                                                                                                 		      $scope.user.data=null
                                                                                                                                                   });
                                                                                                                                            };
                                                                                                                                 		    
                                                                                                                                 		    $scope.chargergrade();
                                                                                                                                 		    
                                                                                                                                 		    $scope.user = {
                                                                                                                                 		          data: []                            
                                                                                                                                 		    }; 
                                                                                                                                 		    
                                                                                                                                 		    $scope.init=function(){
                                                                                                                                 		          $scope.grade={};
                                                                                                                                 		    }
                                                                                                                                                     
                                                                                                                                             $scope.showConfirm = function(event,id) {
                                                                                                                                                    var confirm = $mdDialog.confirm()
                                                                                                                                                    .title('Etes-vous sur de vouloir supprimer cet enregistremnt,')
                                                                                                                                                    .textContent('Cet operation ne pourra plus être annuler')
                                                                                                                                                    .ariaLabel('UM Avertissement')
                                                                                                                                                    .targetEvent(event)
                                                                                                                                                    .ok('Oui')
                                                                                                                                                    .cancel('Non');
                                                                                                                                                         $mdDialog.show(confirm).then(function() {
                                                                                                                                                             $scope.supprimergrade(id);
                                                                                                                                                             $scope.status = 'Enregistrement supprimer avec succès';
                                                                                                                                                             }, function() {
                                                                                                                                                                 $scope.status = 'Opération annulée';                     
                                                                                                                                                         });
                                                                                                                                              };$scope.regex = '^[a-zA-Z0-9._-]+$';
                                                                                                                                              
                                                                                                                                              $scope.validergrade=function()
                                                                                                                                              {
                                                                                                                                             		$http.post("/addGrade",$scope.grade)
                                                                                                                                             		.then(function(response){  		
                                                                                                                                             			$scope.grade=response.data; 			
                                                                                                                                             		    $scope.chargergrade();
                                                                                                                                             		    
                                                                                                                                             		   new PNotify({
                                                                                                                                                           title: 'Umanager notification ',
                                                                                                                                                           text:  'Enregistrement éffectuée avec succes',
                                                                                                                                                           type: 'success',
                                                                                                                                                           styling: 'bootstrap3',
                                                                                                                                                           delay:2000,
                                                                                                                                                           history:false,
                                                                                                                                                           sticker:true
                                                                                                                                                            
                                                                                                                                                          });
                                                                                                                                           		    
                                                                                                                                           		 },function errorCallback(response){
                                                                                                                                           			 new PNotify({
                                                                                                                                                            title: 'Umanager error ',
                                                                                                                                                            text: 'Cette grade existe déjà',
                                                                                                                                                            type: 'error',
                                                                                                                                                            styling: 'bootstrap3',
                                                                                                                                                            delay:2500,
                                                                                                                                                            history:false,
                                                                                                                                                            sticker:true
                                                                                                                                                             
                                                                                                                                                           });
                                                                                                                                           			 
                                                                                                                                           		 })
                                                                                                                                             			
                                                                                                                                            	    	
                                                                                                                                              }
                                                                                                                                              
                                                                                                                                              $scope.modifiergrade=function(id1){
                                                                                                                                                    $http.get("/updateGrade?id="+id1)
                                                                                                                                                         .then(function(response){
                                                                                                                                                                 
                                                                                                                                                                 $scope.grade=response.data;
                                                                                                                                                                 
                                                                                                                                                             });
                                                                                                                                              }    
                                                                                                                                               
                                                                                                                                              
                                                                                                                                             $scope.supprimergrade=function(id){
                                                                                                                                                  $http.delete("/deleteGrade?id="+id)
                                                                                                                                                  	  .then(function(response){
                                                                                                                                                          $scope.chargergrade();
                                                                                                                                                   });
                                                                                                                           }


                                                                                                                };      

                                                                 
                                                        	
     	









         
     	












         
         
      
         




     	












         
         
      
         

















         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         