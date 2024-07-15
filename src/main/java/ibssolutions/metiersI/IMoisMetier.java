package ibssolutions.metiersI;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.MoisRepository;
import ibssolutions.entity.parametre.Mois;
import ibssolutions.metiers.MoisMetier;


@Service @Transactional
public class IMoisMetier  implements MoisMetier{

	//Implementation de l'interface mois ce 11/02/2022
	
	@Autowired 
	private MoisRepository moisRepository;
	
	@Override
	public Mois addMois(Mois m) {
		// TODO Sauvegarder un mois pour la gestion des saliares menssuel
		return moisRepository.save(m);
	}

	@Override
	public Mois editeMois(Long id) {
		// TODO Sélectioné un mois a modifier .get pour eviter d'utiliser Optional
		return moisRepository.findOne(id);
	}

	@Override
	public Mois getMoisActif() {
		// TODO Selectioné le mois actif pour la gestion automaique des salires
		return moisRepository.getMoisTrue();
	}

	@Override
	public void deleteMois(Long id) {
		// TODO Supprimer un mois
		moisRepository.delete(id);
		
	}

	@Override
	public void activerMois(Long id) throws ParseException {
		// TODO Activer un mois pour gerer les salaires
		List<Mois> Lmois = moisRepository.findAll();
		for (Mois mois : Lmois)
		{
			if ( mois.isEtat() != false ) 
			{
				mois.setEtat(false);
				moisRepository.save(mois);
			}
		
		}
		
		Mois mo = moisRepository.findOne(id);
		mo.setEtat(true);
		mo.setDateDebut(new Date());
		
		
		Date dates = mo.getDateDebut();
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");  
		String strDate = dateFormat.format(dates);  
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		Date parse = sdf.parse(strDate);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(parse);
		int date = calendar.get(Calendar.DATE);
		//+1 Is Important Because if the month is January then coming 0 so Add +1
		int month = calendar.get(Calendar.MONTH)+1;
		int year = calendar.get(Calendar.YEAR);
		System.out.println("Date:"+date +":Month:"+ month + ":Year:"+year);
		
		
		LocalDate initial = LocalDate.of(year, month, date);
		LocalDate start = initial.withDayOfMonth(1);
		LocalDate end = initial.withDayOfMonth(initial.lengthOfMonth());
		
		
		System.out.println("Dernier Date : " +end+"Dernier Date : " +start);
		
		//String strDates = dateFormat.format(end);
		//SimpleDateFormat sdfinal = new SimpleDateFormat("dd-MM-yyyy");
		  
		//Date dateObj = sdfinal.parse(end);
		
		
		  
		mo.setDateFin(Date.from(end.atStartOfDay(ZoneId.systemDefault()).toInstant()));
		
		moisRepository.save(mo);
	}

	@Override
	public List<Mois> findAllOrdonly() {
		// TODO Liste des mois 
		return moisRepository.findAll();
	}

}
