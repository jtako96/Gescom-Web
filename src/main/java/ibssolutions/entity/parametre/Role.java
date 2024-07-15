package ibssolutions.entity.parametre;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Table(name = "roles")
@Entity 
public class Role implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	private String role;
	
	@Column(name="description", length = 101, nullable = false)
	private String description;

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
