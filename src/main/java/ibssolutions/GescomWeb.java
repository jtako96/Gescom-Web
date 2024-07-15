package ibssolutions;
 
import java.awt.Desktop;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationContext;
import org.springframework.context.event.EventListener;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;



@SpringBootApplication
public class GescomWeb {
	

	public static void main(String[] args) throws IOException {
		//SpringApplication.run(umanager.class, Rags);
		ApplicationContext ctx=	SpringApplication.run(GescomWeb.class, args);
		
	}
	
	
	@EventListener({ApplicationReadyEvent.class})
	public static void applicationReadyEvent() throws IOException {
	 
		System.out.println("Application started ... launching browser now");
	    Browse("http://localhost:8085/login");	
	    // creating an object of class Tesseract  
        Tesseract tesseract = new Tesseract( ) ;  
        try {  
            // this includes the path of tessdata inside the extracted folder  
            tesseract.setDatapath( " C:/Tess4J/tessdata " ) ;  
            // specifying the image that has to be read  
            String text = tesseract.doOCR( new File( " image.jpg " ) ) ;    
            // printing the text corresponding to the image interpreted  
            System.out.print( text ) ;  
        }  
        catch ( TesseractException e ) {  
            e.printStackTrace( ) ;  
        }  
	}
	
	
	public static void Browse(String url) {
	    if(Desktop.isDesktopSupported()){
	        Desktop desktop = Desktop.getDesktop();
	        try {
	            desktop.browse(new URI(url));
	        } catch (IOException | URISyntaxException e) {
	            e.printStackTrace();
	        }
	    }else{
	        Runtime runtime = Runtime.getRuntime();
	        try {
	            runtime.exec("rundll32 url.dll,FileProtocolHandler " + url);
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    }
	}
}
