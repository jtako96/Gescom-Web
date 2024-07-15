package ibssolutions.utils;

public class StringUtils {

    public static String capitalize(String text) {
        StringBuilder str = new StringBuilder();
        String[] tokens = text.split("\\s");
        for (String token : tokens) {
            str.append(Character.toUpperCase(token.charAt(0))).append(token.substring(1)).append(" ");
        }
        str.toString().trim();
        return new String(str);
    }
    
	public static String genererCodeLogiciel(Integer id) {
		String matricule, nombre;
		int finale;
		
		nombre= id.toString();
		finale = Integer.parseInt(nombre);
		matricule = String.format("%04d", finale);
	    return matricule;
		 
	}


}
