FROM circleci/jdk8:0.1.1

LABEL mentainer="j.tako32@gmail.com"

WORKDIR /app

COPY target/ibssolution-0.0.1-SNAPSHOT.jar /app/ibssolution_gescom.jar

ENTRYPOINT ["java", "-jar", "ibssolution_gescom.jar"]