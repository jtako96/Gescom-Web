package ibssolutions.web.controllers;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ibssolutions.entity.stockarticle.Article;
import ibssolutions.metiers.stockarticle.ArticleMetier;



@RestController
@RequestMapping("/api/article")
public class ArticleController {


	/**
	 * @author davibil
	 * Controlleur java pour gérer l'API reste de l'entité Article [ Methode : Ajouter ,Modifier ,Supprimer ,Liste ] ce 28/01/2022
	 */
	
	@Autowired
	private ArticleMetier articleMetier;
	
	@Value("${images.dir}")
	private String imagedir;
	
	@PostMapping(value = "/save" )
	public Article saveArticle(@RequestBody Article a)
	{
		return articleMetier.addArticle(a);
	}
	
	@PostMapping(value = "/update")
	public Article updateArticle(@RequestBody Article a)
	{
		return articleMetier.updateArticle(a);
	}
	

	@GetMapping(value = "/edite/{id}")
	public Article updateArticle(@PathVariable(value ="id") Long id)
	{
		return articleMetier.editeArticle(id);
	}
	
	@DeleteMapping( value = "/delete/{id}")
	public void deleteArticle ( @PathVariable(value ="id") Long id) 
	{
		articleMetier.deleteArticle(id);
	}
	
	@GetMapping( value = "/liste")
	public List<Article> ListeArticle() 
	{
		return articleMetier.findAllOrdonly();
	}
	
	@GetMapping( value = "/liste/sousGroup/{id}")
	public List<Article> ListeArticleBySousGroup(@PathVariable(value ="id") Long id) 
	{
		return articleMetier.findAllOrdonlyBySousGroup(id);
	}
	
	@GetMapping( value = "/liste/aChoisir/{id}/{id2}")
	public List<Article> ListeAchoisire(@PathVariable(value ="id") Long id,@PathVariable(value ="id2") Long id2) 
	{
		return articleMetier.findArticleSousGroupAChoisir(id, id2);
	}
	
	
	private final org.slf4j.Logger log = LoggerFactory.getLogger(this.getClass());

	@RequestMapping(value = "fileUpload", method = RequestMethod.POST)
	public @ResponseBody void upload(@RequestParam("file") MultipartFile file, @RequestParam("idarticle") long idarticle) {

		String filename = "";
		try {

			filename = file.getOriginalFilename();
			 
			
			byte[] bytes = file.getBytes();
			BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(
					new FileOutputStream(new File(imagedir + idarticle+".jpg")));
			bufferedOutputStream.write(bytes);
			bufferedOutputStream.close();

		} catch (IOException ex) {
			log.info("bonjour tom" + " " + filename);
		}

	}
	
	@SuppressWarnings("resource")
	@RequestMapping(value = "/photo2", produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody byte[] testphoto(long idarticle) throws IOException {

		File f = new File(imagedir + idarticle+".jpg");
		if (f.exists() == true) {
			
			return IOUtils.toByteArray(new FileInputStream(f));
		} else
			return null;
	}
}
