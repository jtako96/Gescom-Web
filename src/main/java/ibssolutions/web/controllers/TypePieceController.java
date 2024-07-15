package ibssolutions.web.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibssolutions.entity.comptabilite.TypePiece;
import ibssolutions.metiers.comptabilite.TypePieceMetier;



@RestController
@RequestMapping("/api/typePiece")
public class TypePieceController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité TypePiece [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 16/03/2022
	 */
	
	@Autowired
	private TypePieceMetier typePieceMetier;
	
	@PostMapping(value = "/save" )
	public TypePiece saveTypePiece(@RequestBody TypePiece b)
	{
		return typePieceMetier.addTypePiece(b);
	}
	
	@GetMapping(value = "/edite/{id}")
	public TypePiece updateTypePiece(@PathVariable(value ="id") Long id)
	{
		return typePieceMetier.editeTypePiece(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteTypePiece ( @PathVariable(value ="id") Long id) 
	{
		typePieceMetier.deleteTypePiece(id);
	}
	
	@GetMapping( value = "/liste")
	public List<TypePiece> ListeTypePiece() 
	{
		return typePieceMetier.findAllOrdonly();
	}
	
}
